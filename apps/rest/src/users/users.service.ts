import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from './dtos';
import { User } from '../entities';
import { UsersMapper } from './users.mapper';
import { UsersRepository } from '../database/repositories';
import { areEqual, PagedResult } from '../common';
import { PasswordService } from '../password';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private readonly usersMapper: UsersMapper,
    @Inject(UsersRepository)
    private readonly repository: UsersRepository,
    private readonly passwordService: PasswordService
  ) {}

  async list(
    name?: string,
    offset: number = -1,
    limit: number = -1
  ): Promise<PagedResult<UserDto>> {
    const results: PagedResult<User> = await this.repository.list({
      name,
      offset,
      limit
    });
    return results.as<UserDto>(this.usersMapper.entityToDto);
  }

  async find(id: number): Promise<UserDto | null> {
    const user: User = await this.repository.find(id);
    if (user) {
      return this.usersMapper.entityToDto(user);
    }
    return null;
  }

  async create(createUserDto: CreateUserDto): Promise<number> {
    const user: User = this.usersMapper.createDtoToEntity(createUserDto);
    const passwordHash = await this.passwordService.generateHash(
      createUserDto.password
    );
    this.logger.log(passwordHash);
    (user.passwordHash = passwordHash.hash),
      (user.passwordInterations = passwordHash.iterations);
    user.passwordSalt = passwordHash.salt;

    return this.repository.create(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    const user: User | null = await this.repository.find(id);
    this.logger.log(`User found: ${JSON.stringify(user)}`);
    if (!user) {
      return false;
    }
    const updatedUser = this.usersMapper.updateDtoToEntity(updateUserDto, user);
    this.logger.log(`User updated: ${JSON.stringify(updatedUser)}`);
    if (!areEqual(user, updatedUser)) {
      await this.repository.update(updatedUser);
      return true;
    }
    return false;
  }

  delete(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
