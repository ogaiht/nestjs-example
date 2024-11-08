import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FeatureOperation } from './feature-operation.entity';
import { Role } from './role.entity';

@Entity({ name: 'RolePermissions' })
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Role, (r) => r.permissions)
  role: Role;
  @ManyToOne(() => FeatureOperation, (o) => o.rolePermissions)
  operation: FeatureOperation;
  @Column()
  assignedAt: Date;
}
