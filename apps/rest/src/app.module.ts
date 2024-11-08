import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './database';
import { UserRolesModule } from './user-roles/user-roles.module';
import { LoggerMiddleware } from './middlewares';
import { AuthorizationService } from './authorization/authorization.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { GuardsModule } from './guards/guards.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { SignOnModule } from './sign-on';
import { FeaturesModule } from './features/features.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    AuthenticationModule,
    AuthorizationModule,
    FeaturesModule,
    GuardsModule,
    ProfileModule,
    RolesModule,
    SignOnModule,
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    UserRolesModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthorizationService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
