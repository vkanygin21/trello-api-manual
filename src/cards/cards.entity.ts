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
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @IsString({ always: true })
  @Column()
  userId: string;

  @IsString({ always: true })
  @Column()
  columnId: string;

  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  /**
   * Relations
   */

  @OneToMany((type) => Comments, (ul) => ul.card, { onDelete: 'CASCADE' })
  @Type((t) => Comments)
  @JoinColumn()
  comments?: Comments[];

  @ManyToOne((type) => Columns, (el) => el.cards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  public column: Columns;

  @ManyToOne((type) => User, (el) => el.cards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  public user: User;
}
