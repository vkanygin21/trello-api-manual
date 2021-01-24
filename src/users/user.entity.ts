import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { classToPlain, Exclude, Type } from 'class-transformer';
import { Columns } from '../columns/column.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @OneToMany((type) => Columns, (ul) => ul.user)
  @Type((t) => Columns)
  @JoinColumn()
  columns?: Columns[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  async compareId(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.id);
  }

  toJSON() {
    return classToPlain(this);
  }
}

