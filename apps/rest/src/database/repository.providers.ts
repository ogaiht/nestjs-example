import { DataSource } from 'typeorm';
import { Role, User, UserRole } from '../entities';
import { IoCTypes } from '../IoCTypes';
import { Provider } from '@nestjs/common';

export const repositoryProviders: Provider[] = [
  {
    provide: IoCTypes.repositories.ROLE,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
    inject: [IoCTypes.data.DATA_SOURCE]
  },
  {
    provide: IoCTypes.repositories.USER,
    useFactory: (datasource: DataSource) => datasource.getRepository(User),
    inject: [IoCTypes.data.DATA_SOURCE]
  },
  {
    provide: IoCTypes.repositories.USER_ROLE,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserRole),
    inject: [IoCTypes.data.DATA_SOURCE]
  }
];
