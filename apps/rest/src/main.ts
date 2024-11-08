import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { clusterize, ClusterStrategy } from './clusters';
import { addSwagger } from './swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  addSwagger(app);
  app.enableCors();
  await app.listen(3001);
}

clusterize(ClusterStrategy.SINGLE, bootstrap);
