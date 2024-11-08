import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { RolesRepository } from './roles.repository';
import { UserRolesRepository } from './user-roles.repository';
import { FeaturesRepository } from './features.repository';
import { FeatureOperationsRepository } from './feature-operations.repository';

@Module({
  providers: [
    RolesRepository,
    UsersRepository,
    UserRolesRepository,
    FeaturesRepository,
    FeatureOperationsRepository
  ],
  exports: [
    RolesRepository,
    UsersRepository,
    UserRolesRepository,
    FeaturesRepository,
    FeatureOperationsRepository
  ]
})
export class RepositoriesModule {}
