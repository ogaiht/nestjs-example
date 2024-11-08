import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  Feature,
  FeatureOperation,
  Role,
  RolePermission,
  User,
  UserPermission,
  UserRole
} from '../entities';

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'mL3@rn1ngd',
  database: 'learning',
  entities: [
    Feature,
    FeatureOperation,
    Role,
    RolePermission,
    User,
    UserPermission,
    UserRole
  ],
  synchronize: true
};
