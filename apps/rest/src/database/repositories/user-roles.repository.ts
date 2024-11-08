import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Role, UserRole } from '../../entities';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class UserRolesRepository {
  protected readonly repository: Repository<UserRole>;

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource
  ) {
    this.repository = this.dataSource.getRepository(UserRole);
  }

  async create(userRole: UserRole): Promise<number> {
    userRole.assignedAt = new Date();
    const insertResult = await this.repository.insert(userRole);
    return insertResult.identifiers[0].id;
  }

  async delete(userId: number, roleId: number): Promise<boolean> {
    const deleteResult = await this.repository.delete({
      user: {
        id: userId
      },
      role: {
        id: roleId
      }
    });
    return deleteResult.affected > 0;
  }

  async contains(userId: number, roleId: number): Promise<boolean> {
    const exists: number = await this.repository.count({
      where: [
        {
          user: {
            id: userId
          },
          role: {
            id: roleId
          }
        }
      ]
    });
    return exists > 0;
  }

  async listUserRoles(userId: number): Promise<Role[]> {
    const userRoles: UserRole[] = await this.repository.find({
      where: [{ user: { id: userId } }],
      relations: {
        role: true
      }
    });
    return userRoles.map((u) => u.role);
  }
}
