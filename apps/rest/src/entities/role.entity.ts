import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { UserRole } from './user-role.entity';
import { RolePermission } from './role-permission.entity';

@Entity({ name: 'Roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Index()
  @Column({ length: 100 })
  name: string;
  @Column({ length: 250 })
  description: string;
  @Column()
  createdAt: Date;
  @Column()
  isActive: boolean;
  @OneToMany(() => UserRole, (userRole) => userRole.role)
  users: UserRole[];
  @OneToMany(() => RolePermission, (r) => r.role)
  permissions: RolePermission[];
}
