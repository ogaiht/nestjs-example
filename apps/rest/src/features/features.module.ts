import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { AuthorizationModule } from '../authorization';
import { RepositoriesModule } from '../database/repositories';
import { FeaturesMapper } from './features.mapper';

@Module({
  imports: [AuthorizationModule, RepositoriesModule],
  providers: [FeaturesService, FeaturesMapper],
  controllers: [FeaturesController]
})
export class FeaturesModule {}
