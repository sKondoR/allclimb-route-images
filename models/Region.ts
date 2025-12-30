import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Region {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  name!: string;

  @Column()
  updatedAt: Date = new Date();
}


