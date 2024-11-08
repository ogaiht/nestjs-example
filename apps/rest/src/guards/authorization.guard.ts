import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Authorize } from './authorize';
import { Request } from 'express';
import { AuthorizationService } from '../authorization';
import { User } from '../authentication';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private readonly logger = new Logger(AuthorizationGuard.name);

  constructor(
    private readonly reflector: Reflector,
    @Inject()
    private readonly authorizationService: AuthorizationService
  ) {
    this.logger.log('AuthorizationGuard created.');
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log('Executing validation.');
    const authorize = this.reflector.get(Authorize, context.getHandler());
    if (!authorize) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest<Request>();
    const user: User = request['user'];

    return this.authorizationService.authorize(user, authorize);
  }
}
