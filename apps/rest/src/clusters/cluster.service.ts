import { Logger } from '@nestjs/common';
import cluster, { Worker } from 'cluster';
import * as process from 'process';
import * as os from 'os';
import pidusage from 'pidusage';
import { Action } from '../common';

const clusterConfig = {
  workers: {
    MIN: 2,
    MAX: os.availableParallelism()
  },
  thresholds: {
    CPU: 70,
    MEMORY: 80
  },
  CHECK_INTERVAL: 5000,
  shutdown: {
    CHECK_FINISHED_INTERVAL: 5000,
    RETRIES: 12
  }
};

export interface ClusterConfig {
  checkInterval: number;
  shutdown: ShutdownConfig;
  thresholds: ThresholdConfig;
  workers: WorkersConfig;
}

export interface WorkersConfig {
  min: number;
  max: number;
}

export interface ThresholdConfig {
  cpu: number;
  memory: number;
}

export interface ShutdownConfig {
  checkFinishdInterval: number;
  retries: number;
}

const logger = new Logger('ClusterManagement');
const cpus = os.availableParallelism();

function dynamicClusterize(callback: Action): void {
  if (cluster.isPrimary) {
    for (let i = 0; i < clusterConfig.workers.MIN; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      logger.log(`Worker ${worker.process.pid} died.`);
      if (getWorkers().length < clusterConfig.workers.MIN) {
        logger.log('Minimum worker count reached. Creating new worker.');
        cluster.fork();
      }
    });
    setInterval(async () => {
      await updateWorkersBasedOnWorkload();
    }, clusterConfig.CHECK_INTERVAL);
  } else {
    callback();
  }
}

interface Stat {
  cpu: number;
  memory: number;
}

function getWorkers(): Worker[] {
  if (cluster.workers) {
    const workers = Object.values(cluster.workers).filter(
      (w) => w !== undefined
    );
    if (workers) {
      return workers;
    }
  }
  const message = 'Workers are not defined during clustering.';
  logger.error(message);
  throw new Error(message);
}

async function updateWorkersBasedOnWorkload(): Promise<void> {
  const workers = getWorkers();
  const stats = await getStat(workers);
  logger.log('Verifying workload.');
  logger.log(`Current workers: ${workers.length}`);
  logger.log(`Average CPU usage: ${stats.cpu.toFixed(2)}%`);
  logger.log(
    `Average Memory usage: ${((stats.memory / os.totalmem()) * 100).toFixed(2)}%`
  );
  if (
    stats.cpu > clusterConfig.thresholds.CPU &&
    workers.length < clusterConfig.workers.MAX
  ) {
    logger.log(
      `High load detected. Scaling workers up from ${workers.length} to ${workers.length + 1}`
    );
    cluster.fork();
  } else if (
    stats.cpu < clusterConfig.thresholds.CPU / 2 &&
    workers.length > clusterConfig.workers.MIN
  ) {
    logger.log(
      `Low load detected. Scaling workers down from ${workers.length} to ${workers.length - 1}`
    );
    shutdownWorker(workers[workers.length - 1]);
  } else {
    logger.log('Workload within threshold. No scaling needed.');
  }
}

function shutdownWorker(worker: Worker): void {
  logger.log('Shutting down worker');
  worker.disconnect();
  let count = 0;
  const shutdown = setInterval(() => {
    logger.log(`Shutting down working try: ${count + 1}`);
    if (worker.isConnected() || count === clusterConfig.shutdown.RETRIES) {
      if (count === clusterConfig.shutdown.RETRIES) {
        logger.log('Total number of retries reached. Forcing kill worker.');
      }
      worker.kill();
      logger.log('Worker terminated.');
      clearInterval(shutdown);
    } else {
      count++;
    }
  }, clusterConfig.shutdown.CHECK_FINISHED_INTERVAL);
}

function getRunningProcessIds(workers: Worker[]): number[] {
  const processIds: number[] = [];
  workers.forEach((w) => {
    if (w.process.pid) {
      processIds.push(w.process.pid);
    }
  });
  return processIds;
}

async function getStat(workers: Worker[]): Promise<Stat> {
  const processIds = getRunningProcessIds(workers);
  const stats = await Promise.all(processIds.map((pid) => pidusage(pid)));
  const averageCpu =
    stats.reduce((acc, stat) => acc + stat.cpu, 0) / stats.length;
  const averageMemory =
    stats.reduce((acc, stat) => acc + stat.memory, 0) / stats.length;
  return {
    cpu: averageCpu,
    memory: averageMemory
  };
}

function staticClusterize(callback: Action): void {
  if (cluster.isPrimary) {
    logger.log(`Master cluster ${process.pid} is running.`);
    logger.log(`Creating ${cpus} workers.`);
    for (let i = 0; i < cpus; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      logger.log(`Worker ${worker.process.pid} died.`);
    });
  } else {
    callback();
  }
}

export enum ClusterStrategy {
  DYNAMIC,
  SINGLE,
  STATIC
}

export function clusterize(strategy: ClusterStrategy, callback: Action): void {
  if (strategy === ClusterStrategy.DYNAMIC) {
    dynamicClusterize(callback);
  } else if (strategy === ClusterStrategy.STATIC) {
    staticClusterize(callback);
  } else if (strategy === ClusterStrategy.SINGLE) {
    callback();
  }
}
