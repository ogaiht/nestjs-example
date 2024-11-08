import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  RolesRepository,
  UserRolesRepository,
  UsersRepository
} from '../database/repositories';
import { Role, User, UserRole } from '../entities';
import { RoleDto } from '../roles/dtos';
import { RolesMapper } from '../roles/roles.mapper';

@Injectable()
export class UserRolesService {
  private readonly logger = new Logger(UserRolesService.name);

  constructor(
    @Inject(UserRolesRepository)
    private readonly userRoleRepository: UserRolesRepository,
    @Inject(UsersRepository)
    private readonly userRepository: UsersRepository,
    @Inject(RolesRepository)
    private readonly roleRepository: RolesRepository,
    private readonly rolesMapper: RolesMapper
  ) {}

  async assignRoleToUser(userId: number, roleId: number): Promise<void> {
    if (await this.userRoleRepository.contains(userId, roleId)) {
      throw new Error(
        `User with id: ${userId} already is assigned to the role id ${roleId}.`
      );
    }
    const user: User = await this.userRepository.find(userId);
    if (!user) {
      throw new Error(`User not found for id: ${userId}.`);
    }
    const role: Role = await this.roleRepository.find(roleId);
    if (!role) {
      throw new Error(`Role not found for id: ${roleId}`);
    }
    const userRole: UserRole = new UserRole();
    userRole.user = user;
    userRole.role = role;
    userRole.assignedAt = new Date();
    await this.userRoleRepository.create(userRole);
  }

  async listUserRoles(userId: number): Promise<RoleDto[]> {
    const roles: Role[] = await this.userRoleRepository.listUserRoles(userId);
    return roles.map(this.rolesMapper.entityToDto);
  }

  removeRoleFromUser(userId: number, roleId: number): Promise<boolean> {
    return this.userRoleRepository.delete(userId, roleId);
  }
}
