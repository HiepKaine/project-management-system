import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({ name: 'review'})
export class Review {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  image: string;

  @Column()
  user: string;

  @Column()
  review: string;

  @Column()
  rateCount: number;

  @Column()
  reviewableType: string;

  @Column()
  reviewableId: number;

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
