import { Column, Entity } from 'typeorm';
import BaseEntity from './BaseEntity';

export enum BookMode {
  offline = 'offline',
  online = 'online',
}

@Entity()
class Book extends BaseEntity {
  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: BookMode.offline })
  mode: string;

  @Column({ nullable: true })
  link!: string;
}

export default Book;
