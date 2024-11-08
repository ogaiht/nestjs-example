import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Feature } from '../../entities';
import { DataSource } from 'typeorm';
import { BaseRepository } from './base-repository';

@Injectable()
export class FeaturesRepository extends BaseRepository<Feature> {
  private readonly logger = new Logger(FeaturesRepository.name);

  constructor(
    @InjectDataSource()
    dataSource: DataSource
  ) {
    super(Feature, dataSource);
  }

  create(feature: Feature): Promise<number> {
    const today = new Date();
    feature.createdAt = today;
    feature.updatedAt = today;
    return super.create(feature);
  }

  update(feature: Feature): Promise<boolean> {
    feature.updatedAt = new Date();
    return super.update(feature);
  }
}
