import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { AssignRole } from './dtos';
import { ApiOkResponse } from '@nestjs/swagger';
import { ExecutedDto } from '../common';

@Controller('users/:userId/roles')
export class UserRolesController {
  private readonly logger = new Logger(UserRolesController.name);

  constructor(private readonly userRolesService: UserRolesService) {}

  @Get()
  @ApiOkResponse({
    description: 'List roles owned by user',
    type: Array<number>
  })
  async listRolesAssignedToUser(
    @Param('userId', ParseIntPipe) userId: number
  ): Promise<number[]> {
    this.logger.log(`Finding roles for ${userId}`);
    const roles = await this.userRolesService.listUserRoles(userId);
    return roles.map((r) => r.id);
  }

  @Post()
  @ApiOkResponse({
    description: 'Assign a role to a user',
    type: ExecutedDto
  })
  async assignRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() role: AssignRole
  ): Promise<ExecutedDto> {
    await this.userRolesService.assignRoleToUser(userId, role.roleId);
    return { success: true };
  }

  @ApiOkResponse({
    description: 'Remove a role from the user',
    type: ExecutedDto
  })
  @Delete(':roleId')
  async removeRoleFromUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number
  ): Promise<ExecutedDto> {
    const success = await this.userRolesService.removeRoleFromUser(
      userId,
      roleId
    );
    return { success };
  }
}
