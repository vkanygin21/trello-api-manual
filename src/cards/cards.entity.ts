import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString, MaxLength } from 'class-validator';
import { Columns } from '../columns/columns.entity';
import { User } from '../users/user.entity';
import { Comments } from '../comments/comments.entity';
import { Type } from 'class-transformer';

@Entity()
export class Cards {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  /**
   * Relations
   */

  @OneToMany((type) => Comments, (ul) => ul.card)
  @Type((t) => Comments)
  @JoinColumn()
  comments?: Comments[];

  @ManyToOne((type) => Columns, (el) => el.cards)
  public column: Columns;

  @ManyToOne((type) => User, (el) => el.cards)
  public user: User;
}
