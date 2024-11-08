import { User } from '../entities';
import { CreateUserDto, UserDto, UpdateUserDto } from './dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersMapper {
  createDtoToEntity(createUserDto: CreateUserDto): User {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    return user;
  }

  updateDtoToEntity(updateUserDto: UpdateUserDto, user: User): User {
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    return user;
  }

  entityToDto(user: User): UserDto {
    if (!user) {
      return undefined;
    }
    const dto = new UserDto();
    dto.id = user.id;
    dto.name = user.name;
    dto.email = user.email;
    return dto;
  }
}
