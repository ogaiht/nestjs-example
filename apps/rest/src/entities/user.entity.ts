import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { UserRole } from './user-role.entity';
import { UserPermission } from './user-permission.entity';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Index()
  @Column({ length: 250 })
  name: string;
  @Index({ unique: true })
  @Column({ length: 250 })
  email: string;
  @Column()
  createdAt: Date;
  @Column({ nullable: true })
  updatedAt: Date;
  @Column()
  isActive: boolean;
  @OneToMany(() => UserRole, (userRole) => userRole.user)
  roles: UserRole[];
  @Column({ length: 256, nullable: false })
  passwordHash: string;
  @Column({ length: 64, nullable: false })
  passwordSalt: string;
  @Column()
  passwordInterations: number;
  @OneToMany(() => UserPermission, (p) => p.user)
  permissions: UserPermission[];
}
