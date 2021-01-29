import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../users/users.entity';
import { Cards } from '../cards/cards.entity';

@Entity()
export class Columns {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @IsString({ always: true })
  @Column()
  userId: string;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  /**
   * Relations
   */

  @ManyToOne((type) => User, (el) => el.columns, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  public user: User;

  @OneToMany((type) => Cards, (ul) => ul.column)
  @Type((t) => Cards)
  @JoinColumn()
  cards?: Cards[];
}
