import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'teacher' })
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  teacherCode: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column()
  sex: string;

  @Column()
  level: string;

  @Column()
  email: string;

  @Column()
  nationality: string;

  @Column()
  subject: string;

  @DeleteDateColumn({
    type: 'timestamp',
  })
  public deletedAt: Date;

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
