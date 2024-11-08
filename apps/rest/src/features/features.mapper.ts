import { Feature } from '../entities';
import {
  CreateFeatureDto,
  FeatureDto,
  UpdateFeatureDto
} from './dtos/create-feature.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeaturesMapper {
  createDtoToEntity(createFeatureDto: CreateFeatureDto): Feature {
    const feature = new Feature();
    feature.name = createFeatureDto.name;
    feature.description = createFeatureDto.description;
    feature.securityTag = createFeatureDto.securityTag;
    return feature;
  }

  updateDtoToEntity(
    updateFeatureDto: UpdateFeatureDto,
    feature: Feature
  ): Feature {
    feature.name = updateFeatureDto.name ?? feature.name;
    feature.description = updateFeatureDto.description ?? feature.description;
    feature.securityTag = updateFeatureDto.securityTag ?? feature.securityTag;
    return feature;
  }

  entityToDto(feature: Feature): FeatureDto {
    if (!feature) {
      return undefined;
    }
    const featureDto = new FeatureDto();
    featureDto.id = feature.id;
    featureDto.name = feature.name;
    featureDto.description = feature.description;
    featureDto.securityTag = feature.securityTag;
    return featureDto;
  }
}
