import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersMapper } from './users.mapper';
import { RepositoriesModule } from '../database/repositories';
import { AuthorizationModule } from '../authorization';
import { PasswordModule } from '../password';

@Module({
  imports: [AuthorizationModule, RepositoriesModule, PasswordModule],
  controllers: [UsersController],
  providers: [UsersService, UsersMapper],
  exports: [UsersService]
})
export class UsersModule {}
