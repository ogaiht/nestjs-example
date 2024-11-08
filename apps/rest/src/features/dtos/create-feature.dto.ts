import { PartialType } from '@nestjs/mapped-types';

export class CreateFeatureDto {
  name: string;
  description: string;
  securityTag: string;
}

export class FeatureDto extends CreateFeatureDto {
  id: number;
}

export class UpdateFeatureDto extends PartialType(CreateFeatureDto) {}
