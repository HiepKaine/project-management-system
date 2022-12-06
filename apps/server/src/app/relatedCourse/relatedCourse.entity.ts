import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity({ name: 'relatedCourse'})
export class RelatedCourse {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  courseId: number;

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


  @ManyToMany(() => RelatedCourse, (relatedCourse) => relatedCourse.relatedCourses)
  @JoinTable()
  relatedCourses: RelatedCourse[]
}
