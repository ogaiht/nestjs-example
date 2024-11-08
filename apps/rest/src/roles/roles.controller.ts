import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from './dtos';
import { CreatedDto, ExecutedDto, PagedResult } from '../common';
import { AuthorizationGuard, Authorize } from '../guards';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { BusinessError } from '../common/business-error';

@UseGuards(AuthorizationGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Authorize('roles:list')
  @Get()
  list(
    @Query('name') name?: string,
    @Query('offset', ParseIntPipe) offset?: number,
    @Query('limit', ParseIntPipe) limit?: number
  ): Promise<PagedResult<RoleDto>> {
    return this.roleService.list(name, offset, limit);
  }

  @Authorize('roles:get')
  @Get(':id')
  @ApiOkResponse({
    description: 'Returns a role based on its id.',
    type: RoleDto
  })
  async find(@Param('id', ParseIntPipe) id: number): Promise<RoleDto> {
    const roleDto: RoleDto = await this.roleService.find(id);
    return roleDto;
  }

  @Authorize('roles:create')
  @Post()
  @ApiCreatedResponse({
    description: 'Creates a new Role and returns its id.',
    type: CreatedDto
  })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<CreatedDto> {
    const id: number = await this.roleService.create(createRoleDto);
    return { id };
  }

  @Authorize('roles:update')
  @Patch(':id')
  @ApiOkResponse({
    description: 'Updates a Role',
    type: ExecutedDto
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto
  ): Promise<ExecutedDto> {
    const success = await this.roleService.update(id, updateRoleDto);
    return { success };
  }

  @Authorize('roles:delete')
  @Delete(':id')
  @ApiOkResponse({
    description: 'Deletes a Role',
    type: ExecutedDto
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ExecutedDto> {
    try {
      const success = await this.roleService.delete(id);
      return { success };
    } catch (error) {
      if (error instanceof BusinessError) {
        return { success: false, message: error.message };
      } else {
        throw error;
      }
    }
  }
}
