import { ApiProperty } from '@nestjs/swagger';
import { Func } from './types';

export class PagedResult<TResult> {
  @ApiProperty()
  public readonly data: TResult[];
  @ApiProperty()
  public readonly offset: number;
  @ApiProperty()
  public readonly limit: number;
  @ApiProperty()
  public readonly total: number;
  constructor(data: TResult[], offset: number, limit: number, total: number) {
    this.data = data;
    this.offset = offset;
    this.limit = limit;
    this.total = total;
  }

  as<TNewType>(mapping: Func<TResult, TNewType>): PagedResult<TNewType> {
    return new PagedResult<TNewType>(
      this.data.map((i) => mapping(i)),
      this.offset,
      this.limit,
      this.total
    );
  }
}
