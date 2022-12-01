import {
  Column,
  CreateDateColumn,
  Entity, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'highlight' })
export class Highlight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  resourceId: number;

  @Column()
  resourceType: string;

  @Column()
  relatedId: number;

  @Column()
  relatedType: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: null,
    default: () => 'NOW()',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: null,
    default: () => 'NOW()',
  })
  public updatedAt: Date;

}
