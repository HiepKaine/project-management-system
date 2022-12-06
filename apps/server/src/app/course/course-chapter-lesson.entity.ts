import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lesson } from '../lesson/lesson.entity';
import { CourseChapter } from './course-chapter.entity';

@Entity({ name: 'courseChapterLesson' })
export class CourseChapterLesson {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => CourseChapter, (courseChapter) => courseChapter.courseChapterLessons)
  courseChapter: CourseChapter;

  @ManyToOne(() => Lesson, (lesson) => lesson.courseChapterLessons)
  lesson: Lesson;
}
