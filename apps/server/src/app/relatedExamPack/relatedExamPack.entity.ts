import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity({ name: 'relatedExamPack' })
export class RelatedExamPack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  examPackId: number;

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

}
