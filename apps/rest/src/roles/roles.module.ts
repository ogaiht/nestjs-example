import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesMapper } from './roles.mapper';
import { RepositoriesModule } from '../database/repositories';
import { AuthorizationModule } from '../authorization';

@Module({
  imports: [AuthorizationModule, RepositoriesModule],
  controllers: [RolesController],
  providers: [RolesService, RolesMapper]
})
export class RolesModule {}
