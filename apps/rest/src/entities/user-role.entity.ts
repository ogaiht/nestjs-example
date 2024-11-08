import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity({ name: 'UserRoles' })
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.roles)
  user: User;
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
  @Column()
  assignedAt: Date;
}
