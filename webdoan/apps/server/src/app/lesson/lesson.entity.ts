import { CourseChapter } from './../course/course-chapter.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CourseChapterLesson } from "../course/course-chapter-lesson.entity";
import { Category } from '../category/category.entity';

@Entity({ name: 'lesson' })
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  categoryId: number;

  @Column()
  link: string;

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

  @OneToMany(() => CourseChapterLesson, (courseChapterLesson) => courseChapterLesson.lesson)
  courseChapterLessons: CourseChapterLesson[];

  @ManyToOne(() => Category, (category) => category.lessons)
  category: Category;

  @ManyToMany(() => CourseChapter, (courseChapter) => courseChapter.lessons, { cascade: ['insert'] })
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
  courseChapters: CourseChapter[];
}
