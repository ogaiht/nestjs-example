import { Controller } from '@nestjs/common';
import { SignOnDto } from './dtos';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos';

@Controller('signon')
export class SignOnController {
  constructor(private readonly userService: UsersService) {}

  async signon(signonDto: SignOnDto): Promise<void> {
    const createUserDto = new CreateUserDto();
    createUserDto.name = '';
    createUserDto.email = signonDto.email;
    createUserDto.password = signonDto.password;
    await this.userService.create(createUserDto);
  }
}
