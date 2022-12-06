import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lesson } from '../lesson/lesson.entity';
import { CourseChapterLesson } from './course-chapter-lesson.entity';
import { Course } from './course.entity';

@Entity({ name: 'courseChapter' })
export class CourseChapter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courseId: number;

  @Column()
  name: string;

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

  @OneToMany(() => CourseChapterLesson, (courseChapterLesson) => courseChapterLesson.courseChapter)
  courseChapterLessons: CourseChapterLesson[];

  @ManyToOne(() => Course, (course) => course.courseChapters)
  course: Course;

  @ManyToMany(() => Lesson, (lesson) => lesson.courseChapters, { cascade: ['insert'] })
  @JoinTable({
    name: 'courseChapterLesson',
    joinColumn: {
      name: 'courseChapterId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'lessonId',
      referencedColumnName: 'id',
    },
  })
  lessons: Lesson[];
}
