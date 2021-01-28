import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './comments.entity';
import { CardsService } from '../cards/cards.service';
import { CreateCommentsDto, UpdateCommentsDto } from './comments.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
    private readonly cardsService: CardsService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createCommentsDto: CreateCommentsDto,
    cardId: string,
    userId: string,
  ) {
    const user = await this.usersService.findOne({ id: userId });
    const column = await this.cardsService.findOne({
      id: cardId,
      userId: userId,
    });
    const comment = await this.commentsRepository.create(createCommentsDto);
    comment.user = user;
    comment.card = column;

    return await this.commentsRepository.save(comment);
  }

  async findAll() {
    return await this.commentsRepository.find();
  }

  findOne(id: number) {
    return this.commentsRepository.findOne();
  }

  update(id: number, updateCommentsDto: UpdateCommentsDto) {
    return this.commentsRepository.update(id, updateCommentsDto);
  }

  async remove(id: string) {
    await this.commentsRepository.delete({ id });

    return { id };
  }
}
