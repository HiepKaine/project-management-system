import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'slider'})
export class Slider {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  alt: string;

  @Column()
  order: number;

  @Column()
  url: string;

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
