import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Role, UserRole } from '../../entities';
import { Repository, DataSource, FindOptionsWhere, Like } from 'typeorm';
import { RoleFilter } from './utils';
import { PagedResult } from '../../common';
import { BaseRepository } from './base-repository';

@Injectable()
export class RolesRepository extends BaseRepository<Role> {
  protected readonly repository: Repository<Role>;

  constructor(
    @InjectDataSource()
    dataSource: DataSource
  ) {
    super(Role, dataSource);
  }

  create(role: Role): Promise<number> {
    role.createdAt = new Date();
    role.isActive = true;
    return super.create(role);
  }

  list(filter: RoleFilter): Promise<PagedResult<Role>> {
    const where: FindOptionsWhere<Role> = filter.name
      ? { name: Like(filter.name) }
      : {};
    return this.listWithPagination(where, filter);
  }

  async delete(id: number): Promise<boolean> {
    const count = await this.dataSource.getRepository(UserRole).count({
      where: {
        role: {
          id
        }
      }
    });
    if (count > 0) {
      throw new Error(`Role ${id} is assigned to users and cannot be deleted.`);
    }
    return super.delete(id);
  }
}
