import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User, UserRole } from '../entities';
import { UserRolesController } from './user-roles.controller';
import { UserRolesService } from './user-roles.service';
import { RolesMapper } from '../roles';
import { RepositoriesModule } from '../database/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, UserRole]),
    RepositoriesModule
  ],
  controllers: [UserRolesController],
  providers: [UserRolesService, RolesMapper]
})
export class UserRolesModule {}
