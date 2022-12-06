import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../auth/entity/user.entity";
import { Course } from "../course/course.entity";

@Entity({ name: 'userCourse'})
export class UserCourse {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  userId: number;

  @Column()
  courseId: number;
  
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

  @ManyToOne(() => Course, (course) => course.userCourses)
  course: Course;

  @ManyToOne(() => User, (user) => user.userCourses)
  user: User;
}
