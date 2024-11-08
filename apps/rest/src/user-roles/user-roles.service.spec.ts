import { Test, TestingModule } from '@nestjs/testing';
import { UserRolesService } from './user-roles.service';
import {
  RolesRepository,
  UserRolesRepository,
  UsersRepository
} from '../database/repositories';
import { RolesMapper } from '../roles';

describe('UserRolesService', () => {
  let service: UserRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRolesService,
        {
          provide: UserRolesRepository,
          useValue: {}
        },
        {
          provide: UserRolesRepository,
          useValue: {}
        },
        {
          provide: UsersRepository,
          useValue: {}
        },
        {
          provide: RolesRepository,
          useValue: {}
        },
        {
          provide: RolesMapper,
          useValue: {}
        }
      ]
    }).compile();

    service = module.get<UserRolesService>(UserRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
