import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { FeatureOperation } from './feature-operation.entity';

@Entity({ name: 'features' })
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;
  @Index()
  @Column({ length: 100 })
  name: string;
  @Column({ length: 500 })
  description: string;
  @Index()
  @Column({ length: 100 })
  securityTag: string;
  @OneToMany(() => FeatureOperation, (o) => o.feature)
  operations: FeatureOperation[];
  @Column()
  createdAt: Date;
  @Column({ nullable: true })
  updatedAt: Date;
}
