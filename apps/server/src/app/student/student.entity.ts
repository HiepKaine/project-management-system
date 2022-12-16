import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'student' })
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  facultyId: number;

  @Column()
  classId: number;

  @Column()
  studentCode: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  studentYear: string;

  @Column()
  idCard: string;

  @Column()
  phoneNumber: string;

  @Column()
  sex: number;

  @Column()
  date: string;

  @Column()
  address: string;

  @Column()
  ethnic: string;

  @Column()
  religion: string;

  @Column()
  fatherName: string;

  @Column()
  fatherJob: string;

  @Column()
  fatherPhoneNumber: string;

  @Column()
  motherName: string;

  @Column()
  motherJob: string;

  @Column()
  motherPhoneNumber: string;

  @Column()
  note: string;

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
