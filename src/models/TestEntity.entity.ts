import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TestEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}

console.log('TestEntity loaded from:', __filename);