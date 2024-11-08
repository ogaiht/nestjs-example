import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { FeatureOperation } from './feature-operation.entity';

@Entity({ name: 'UserPermissions' })
export class UserPermission {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.permissions)
  user: User;
  @ManyToOne(() => FeatureOperation, (o) => o.userPermissions)
  operation: FeatureOperation;
  @Column()
  assignedAt: Date;
}
