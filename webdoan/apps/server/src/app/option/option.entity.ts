import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'option'})
export class Option {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  key: string;

  @Column()
  label: string;

  @Column()
  value: number;

  @Column()
  type: string;

  @Column()
  extra: "json";

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
