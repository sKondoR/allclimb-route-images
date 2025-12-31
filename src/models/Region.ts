import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Region {
  @PrimaryColumn()
  _id!: string;

  @Column()
  name!: string;

  @Column()
  country!: string;

  @Column()
  season!: string;

  @Column()
  link!: string;

  @Column()
  updatedAt: Date = new Date();
}
