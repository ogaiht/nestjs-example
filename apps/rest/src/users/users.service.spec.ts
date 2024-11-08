import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from '../database/repositories';
import { PasswordHash, PasswordService } from '../password';
import { UsersMapper } from './users.mapper';
import { User } from '../entities';
import { CreateUserDto, UpdateUserDto, UserDto } from './dtos';
import { areEqual } from '../common';

jest.mock('../common', () => ({
  areEqual: jest.fn()
}));

describe('UsersService', () => {
  let service: UsersService;
  let userMappers: UsersMapper;
  let passwordService: PasswordService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersMapper,
          useValue: {
            createDtoToEntity: jest.fn(() => null),
            updateDtoToEntity: jest.fn(),
            entityToDto: jest.fn()
          }
        },
        {
          provide: PasswordService,
          useValue: {
            generateHash: jest.fn()
          }
        },
        {
          provide: UsersRepository,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            update: jest.fn()
          }
        }
      ]
    }).compile();

    userMappers = module.get(UsersMapper);
    passwordService = module.get(PasswordService);
    usersRepository = module.get(UsersRepository);

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('finding user by id', async () => {
    const id = 1;
    const user = new User();
    user.id = id;
    const userDto = new UserDto();
    userDto.id = id;
    jest
      .spyOn(usersRepository, 'find')
      .mockImplementation(() => Promise.resolve(user));
    jest
      .spyOn(userMappers, 'entityToDto')
      .mockImplementationOnce((u) => (u === user ? userDto : undefined));
    expect(await service.find(id)).toBe(userDto);
  });

  it('creating user should return success', async () => {
    const newUserName = 'UserName';
    const newUserEmail = 'UserEmail';
    const newUserPassword = 'Password';

    const createUserDto = new CreateUserDto();
    createUserDto.name = newUserName;
    createUserDto.email = newUserEmail;
    createUserDto.password = newUserPassword;

    const user = new User();
    user.name = newUserName;
    user.email = newUserEmail;

    const passwordHashValue = 'p-hash';
    const passwordIterations = 1000;
    const passwordSalt = 'p-salt';

    const passwordHash: PasswordHash = {
      hash: passwordHashValue,
      iterations: passwordIterations,
      salt: passwordSalt
    };

    const newUserId = 2;

    jest
      .spyOn(userMappers, 'createDtoToEntity')
      .mockImplementationOnce((d) => (d === createUserDto ? user : undefined));

    jest
      .spyOn(passwordService, 'generateHash')
      .mockImplementation((p) =>
        Promise.resolve<PasswordHash>(
          p === newUserPassword ? passwordHash : undefined
        )
      );

    jest.spyOn(usersRepository, 'create').mockImplementationOnce((u) => {
      if (
        u.name === newUserName &&
        u.email === newUserEmail &&
        u.passwordHash === passwordHashValue &&
        u.passwordInterations === passwordIterations &&
        u.passwordSalt === passwordSalt
      ) {
        u.id = newUserId;
        u.createdAt = new Date();
        return Promise.resolve(newUserId);
      }
      return Promise.resolve<number>(undefined);
    });

    expect(await service.create(createUserDto)).toBe(newUserId);
  });

  it('updating should update entity based on id and update dto and return true', async () => {
    const updateId = 3;
    const updateUserDto = new UpdateUserDto();
    const user = new User();
    const updatedUser = new User();

    jest
      .spyOn(usersRepository, 'find')
      .mockImplementationOnce((id) =>
        Promise.resolve<User | null>(id === updateId ? user : null)
      );

    jest
      .spyOn(userMappers, 'updateDtoToEntity')
      .mockImplementation((dto, u) =>
        dto === updateUserDto ? updatedUser : undefined
      );

    const mockedFunction = areEqual as jest.MockedFunction<typeof areEqual>;
    mockedFunction.mockImplementation((first, second) => false);

    const update = jest.spyOn(usersRepository, 'update');

    expect(await service.update(updateId, updateUserDto)).toBe(true);
    expect(update).toHaveBeenCalledWith(updatedUser);
  });

  it('updating should return false if entity not found', async () => {
    const updateId = 3;
    const updateUserDto = new UpdateUserDto();

    jest
      .spyOn(usersRepository, 'find')
      .mockImplementationOnce((id) => Promise.resolve<User | null>(null));

    const update = jest.spyOn(usersRepository, 'update');

    expect(await service.update(updateId, updateUserDto)).toBe(false);

    expect(update).toHaveBeenCalledTimes(0);
  });

  it('updating should return false entity is found by nothing has changed', async () => {
    const updateId = 3;
    const updateUserDto = new UpdateUserDto();
    const user = new User();
    const updatedUser = new User();

    jest
      .spyOn(usersRepository, 'find')
      .mockImplementationOnce((id) =>
        Promise.resolve<User | null>(id === updateId ? user : null)
      );

    jest
      .spyOn(userMappers, 'updateDtoToEntity')
      .mockImplementation((dto, u) =>
        dto === updateUserDto ? updatedUser : undefined
      );

    const mockedFunction = areEqual as jest.MockedFunction<typeof areEqual>;
    mockedFunction.mockImplementation((first, second) => true);

    const update = jest.spyOn(usersRepository, 'update');

    expect(await service.update(updateId, updateUserDto)).toBe(false);
    expect(update).toHaveBeenCalledTimes(0);
  });
});
