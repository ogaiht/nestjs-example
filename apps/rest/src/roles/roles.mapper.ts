import { Role } from '../entities';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from './dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesMapper {
  createDtoToEntity(createRoleDto: CreateRoleDto): Role {
    const role = new Role();
    role.name = createRoleDto.name;
    role.description = createRoleDto.description;
    return role;
  }

  updateDtoToEntity(updateRoleDto: UpdateRoleDto, role: Role): Role {
    role.name = updateRoleDto.name;
    role.description = updateRoleDto.description;
    return role;
  }

  entityToDto(role: Role): RoleDto {
    const roleDto = new RoleDto();
    roleDto.id = role.id;
    roleDto.name = role.name;
    roleDto.description = role.description;
    return roleDto;
  }
}
