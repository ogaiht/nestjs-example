import { Constructor, Entity, PagedResult } from '../../common';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Pagination } from './utils';

export abstract class BaseRepository<TEntity extends Entity<number>> {
  protected readonly repository: Repository<TEntity>;

  constructor(
    private readonly entityInfo: Constructor<TEntity>,
    protected readonly dataSource: DataSource
  ) {
    this.repository = this.dataSource.getRepository(this.entityInfo);
  }

  async create(entity: TEntity): Promise<number> {
    const insertResult = await this.repository.save(entity);
    return insertResult.id;
  }

  find(id: number): Promise<TEntity | null> {
    return this.repository.findOneBy({ id } as FindOptionsWhere<TEntity>);
  }

  async update(entity: TEntity): Promise<boolean> {
    const result = await this.repository.update(
      { id: entity.id } as FindOptionsWhere<TEntity>,
      entity as QueryDeepPartialEntity<TEntity>
    );
    return result.affected > 0;
  }

  async delete(id: number): Promise<boolean> {
    const deleteResult = await this.repository.delete({
      id
    } as FindOptionsWhere<TEntity>);
    return deleteResult.affected > 0;
  }

  protected async listWithPagination(
    where: FindOptionsWhere<TEntity>,
    pagination: Pagination
  ): Promise<PagedResult<TEntity>> {
    const total: number = await this.repository.count({ where });
    let entities: TEntity[];
    if (total > 0) {
      entities = await this.repository.find({
        where,
        skip: pagination.offset ?? -1,
        take: pagination.limit ?? -1
      });
    } else {
      entities = [];
    }
    return new PagedResult(
      entities,
      pagination.offset,
      pagination.limit,
      total
    );
  }
}
