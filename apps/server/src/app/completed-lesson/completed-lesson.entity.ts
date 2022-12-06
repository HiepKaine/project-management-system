import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CourseChapter } from '../course/course-chapter.entity';


@Entity({ name: 'completedLesson' })
export class CompletedLesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  courseChapterId: number;

  @Column()
  lessonId: number;

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

  @ManyToOne(() => CourseChapter, (courseChapter) => courseChapter.completedLessons)
  courseChapter: CourseChapter;
}
