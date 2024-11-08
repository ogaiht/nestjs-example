import { Injectable, Logger } from '@nestjs/common';
import { User } from '../authentication';

@Injectable()
export class AuthorizationService {
  private readonly logger = new Logger(AuthorizationService.name);

  authorize(user: User, action: string): Promise<boolean> {
    this.logger.log(`Authorizing ${JSON.stringify(user)} to access: ${action}`);
    const allow =
      (user.claims
        .find((c) => c.name === 'permissions')
        ?.value?.indexOf(action) ?? -1) > -1;
    return Promise.resolve(allow);
  }
}
