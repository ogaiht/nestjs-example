import { Module } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';
import { AuthorizationModule } from '../authorization';
import { AuthenticationGuard } from './authentication.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [AuthorizationModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard
    },
    AuthorizationGuard
  ]
})
export class GuardsModule {}
