import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from './dtos';
import { UsersService } from './users.service';
import { CreatedDto, ExecutedDto, PagedResult } from '../common';
import { AuthorizationGuard, Authorize, Public } from '../guards';
import { SignOnDto } from '../sign-on/dtos';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@UseGuards(AuthorizationGuard)
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Authorize('users:list')
  @Get()
  @ApiOkResponse({
    type: PagedResult<UserDto>
  })
  list(
    @Query('name') name?: string,
    @Query('offset', ParseIntPipe) offset?: number,
    @Query('limit', ParseIntPipe) limit?: number
  ): Promise<PagedResult<UserDto>> {
    this.logger.log('Loading users');
    return this.usersService.list(name, offset, limit);
  }

  @Authorize('users:get')
  @Get(':id')
  @ApiOkResponse({
    type: UserDto
  })
  async find(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.find(id);
  }

  @Authorize('users:create')
  @Post()
  @ApiCreatedResponse({
    description: 'Creates a new Role and returns its id.',
    type: CreatedDto
  })
  @ApiBody({
    type: CreateUserDto
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<CreatedDto> {
    const id = await this.usersService.create(createUserDto);
    return { id };
  }

  @Authorize('users:update')
  @Patch(':id')
  @ApiOkResponse({
    description: 'Updates a User',
    type: ExecutedDto
  })
  @ApiBody({
    type: UpdateUserDto
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ExecutedDto> {
    const success = await this.usersService.update(id, updateUserDto);
    return { success };
  }

  @Authorize('users:delete')
  @Delete(':id')
  @ApiOkResponse({
    type: ExecutedDto
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ExecutedDto> {
    const success = await this.usersService.delete(id);
    return { success };
  }

  @Public()
  @Post('signon')
  async signOn(@Body() signonDto: SignOnDto): Promise<void> {
    const createUserDto = new CreateUserDto();
    createUserDto.name = signonDto.name;
    createUserDto.email = signonDto.email;
    createUserDto.password = signonDto.password;
    await this.usersService.create(createUserDto);
  }
}
