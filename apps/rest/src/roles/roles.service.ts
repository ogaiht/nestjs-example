import { Inject, Injectable, Logger } from '@nestjs/common';
import { Role } from '../entities';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from './dtos';
import { RolesMapper } from './roles.mapper';
import { areEqual, PagedResult } from '../common';
import { RolesRepository } from '../database/repositories';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  constructor(
    @Inject(RolesRepository)
    private readonly roleRepository: RolesRepository,
    private readonly rolesMapper: RolesMapper
  ) {}

  async find(id: number): Promise<RoleDto | null> {
    const role: Role = await this.roleRepository.find(id);
    if (role) {
      return this.rolesMapper.entityToDto(role);
    }
    return null;
  }
  create(createRoleDto: CreateRoleDto): Promise<number> {
    const role: Role = this.rolesMapper.createDtoToEntity(createRoleDto);
    return this.roleRepository.create(role);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<boolean> {
    const role: Role = await this.roleRepository.find(id);
    if (role) {
      const updatedRole: Role = this.rolesMapper.updateDtoToEntity(
        updateRoleDto,
        role
      );
      if (!areEqual(updatedRole, role)) {
        await this.roleRepository.update(updatedRole);
        return true;
      }
    }
    return false;
  }

  delete(id: number): Promise<boolean> {
    return this.roleRepository.delete(id);
  }

  async list(
    name: string = '',
    offset: number = -1,
    limit: number = -1
  ): Promise<PagedResult<RoleDto>> {
    const result = await this.roleRepository.list({
      name,
      offset,
      limit
    });
    return result.as(this.rolesMapper.entityToDto);
  }
}
