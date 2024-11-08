import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { FeatureOperation } from '../../entities';
import { DataSource } from 'typeorm';
import { BaseRepository } from './base-repository';

@Injectable()
export class FeatureOperationsRepository extends BaseRepository<FeatureOperation> {
  private readonly logger = new Logger(FeatureOperationsRepository.name);

  constructor(
    @InjectDataSource()
    dataSource: DataSource
  ) {
    super(FeatureOperation, dataSource);
  }
}
