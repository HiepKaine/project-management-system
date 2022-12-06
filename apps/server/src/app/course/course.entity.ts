import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserCourse } from '../user/userCourse.entity';
import { CourseChapter } from './course-chapter.entity';

export enum CourseStatus {
  active = 1,
  disable = 0
}

@Entity({ name: 'course' })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  name: string;

  @Column({ type: 'varchar' })
  lecturer: string;

  @Column()
  rateCount: number;

  @Column()
  rateAverage: number;

  @Column()
  categoryId: number;

  @Column()
  video: string;

  @Column()
  image: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column()
  isFreeCourse: boolean;

  @Column()
  originalPrice: number;

  @Column()
  price: number;

  @Column({
    type: 'int',
    default: 0,
  })
  status: number;

  @Column({
    type: 'int',
    default: 1,
  })
  type: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  slug: string;

  @DeleteDateColumn({ type: 'timestamp' })
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

  @OneToMany(() => UserCourse, (userCourse) => userCourse.course)
  userCourses: UserCourse[];

  @OneToMany(() => CourseChapter, (courseChapter) => courseChapter.course)
  courseChapters: CourseChapter[];

}
