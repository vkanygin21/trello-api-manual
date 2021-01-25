import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, MaxLength } from 'class-validator';
import { User } from '../users/user.entity';
import { Cards } from '../cards/cards.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @IsString({ always: true })
  @Column({ type: 'varchar', length: 1000, nullable: false })
  body: string;

  /**
   * Relations
   */

  @ManyToOne((type) => Cards, (el) => el.comments)
  public card: Cards;

  @ManyToOne((type) => User, (el) => el.cards)
  public user: User;
}
