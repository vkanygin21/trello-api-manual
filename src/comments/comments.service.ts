import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './comments.entity';
import { CardsService } from '../cards/cards.service';
import { CreateCommentsDto, UpdateCommentsDto } from './comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
    private readonly cardsService: CardsService,
  ) {}

  async create(createCommentsDto: CreateCommentsDto, cardId: string) {
    const card = await this.cardsService.findOne({ id: cardId });
    const comments = await this.commentsRepository.create(createCommentsDto);
    comments.card = card;
    return await this.commentsRepository.save(comments);
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

  async remove(id: number) {
    await this.commentsRepository.delete({ id });
    return { id };
  }
}
