import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { User, UserRole } from '../../entities';
import { DataSource, FindOptionsWhere, Like } from 'typeorm';
import { UserFilter } from './utils/user.filter';
import { PagedResult } from '../../common';
import { BaseRepository } from './base-repository';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  private readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectDataSource()
    dataSource: DataSource
  ) {
    super(User, dataSource);
  }

  create(user: User): Promise<number> {
    user.createdAt = new Date();
    user.isActive = true;
    return super.create(user);
  }

  update(user: User): Promise<boolean> {
    user.updatedAt = new Date();
    return super.update(user);
  }

  list(filter: UserFilter): Promise<PagedResult<User>> {
    const where: FindOptionsWhere<User> = filter.name
      ? { name: Like(filter.name) }
      : {};
    return this.listWithPagination(where, filter);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async delete(id: number): Promise<boolean> {
    return await this.dataSource.transaction(async (entityManager) => {
      this.logger.log(`Deleting user ${id}`);
      const userRoleRepository = entityManager.getRepository(UserRole);
      const userRoleDeleteResult = await userRoleRepository.delete({
        user: {
          id: id
        }
      });
      this.logger.log(`UserRoles deleted ${userRoleDeleteResult.affected}`);
      const userRepository = entityManager.getRepository(User);
      const deleteResult = await userRepository.delete({ id });
      this.logger.log(`User deleted: ${deleteResult.affected === 1}`);
      return deleteResult.affected > 0;
    });
  }
}
