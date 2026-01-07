import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import type { ISettings } from '../shared/types/ISettings';

@Entity('settings')
export class Settings {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('json', { nullable: true })
  scrapStats!: ISettings['scrapStats'];
}
