import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { UsersRepository } from '../database/repositories';
import { PasswordService } from '../password';
import { JwtService } from '@nestjs/jwt';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: UsersRepository,
          useValue: {}
        },
        {
          provide: PasswordService,
          useValue: {}
        },
        {
          provide: JwtService,
          useValue: {}
        }
      ]
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
