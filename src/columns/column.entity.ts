
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
// import { CardEntity } from '../card/card.entity';
import { User } from '../users/user.entity';


@Entity()
export class Columns {

  @PrimaryGeneratedColumn()
  id?: number;

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

  // @OneToMany((type) => CardEntity, (ul) => ul.column)
  // @Type((t) => CardEntity)
  // @JoinColumn()
  // cards?: CardEntity[];

  @ManyToOne((type) => User, (el) => el.columns)
  public user: User;
}
