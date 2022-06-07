import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import BaseEntity from './BaseEntity';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  userId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  parseEmailToLowerCase() {
    if (this.email) {
      this.email = this.email.toLowerCase();
    }
  }
}

export default User;
