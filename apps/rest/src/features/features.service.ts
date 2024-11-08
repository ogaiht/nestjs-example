import { Inject, Injectable } from '@nestjs/common';
import { FeaturesRepository } from '../database/repositories';
import { FeaturesMapper } from './features.mapper';
import { CreateFeatureDto, FeatureDto } from './dtos/create-feature.dto';

@Injectable()
export class FeaturesService {
  constructor(
    @Inject(FeaturesRepository)
    private readonly featuresRepository: FeaturesRepository,
    private readonly featuresMapper: FeaturesMapper
  ) {}

  create(createFeatureDto: CreateFeatureDto): Promise<number> {
    const feature = this.featuresMapper.createDtoToEntity(createFeatureDto);
    return this.featuresRepository.create(feature);
  }

  async find(id: number): Promise<FeatureDto | null> {
    const feature = await this.featuresRepository.find(id);
    if (feature) {
      return this.featuresMapper.entityToDto(feature);
    }
    return null;
  }
}
