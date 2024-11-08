import { Module } from '@nestjs/common';
import { SignOnController } from './sign-on.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [SignOnController]
})
export class SignOnModule {}
