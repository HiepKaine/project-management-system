import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity({ name: 'class' })
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  classCode: string;

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
