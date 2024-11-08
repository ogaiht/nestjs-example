import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Feature } from './feature.entity';
import { UserPermission } from './user-permission.entity';
import { RolePermission } from './role-permission.entity';

@Entity({ name: 'FeatureOperations' })
export class FeatureOperation {
  @PrimaryGeneratedColumn()
  id: number;
  @Index()
  @Column({ length: 100 })
  name: string;
  @Index()
  @Column({ length: 50 })
  tag: string;
  @ManyToOne(() => Feature, (f) => f.operations)
  feature: Feature;
  @OneToMany(() => RolePermission, (p) => p.operation)
  rolePermissions: RolePermission[];
  @OneToMany(() => UserPermission, (p) => p.operation)
  userPermissions: UserPermission[];
  @Column()
  createdAt: Date;
  @Column({ nullable: true })
  updatedAt: Date;
}
