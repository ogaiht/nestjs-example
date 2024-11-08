import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { RepositoriesModule } from '../database/repositories';
import { JwtModule } from '@nestjs/jwt';
import { JwtKey } from './jwt-key';
import { PasswordModule } from '../password';

@Module({
  imports: [
    PasswordModule,
    RepositoriesModule,
    JwtModule.register({
      global: true,
      secret: JwtKey.value,
      signOptions: { expiresIn: '600s' }
    })
  ],
  providers: [AuthenticationService],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
