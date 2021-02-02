import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './comments.entity';
import { CreateCommentsDto, UpdateCommentsDto } from './comments.dto';
import { Users } from '../users/users.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
  ) {}

  async create(
    createCommentsDto: CreateCommentsDto,
    cardId: string,
    user: Users,
  ) {
    return await this.commentsRepository.save({
      ...createCommentsDto,
      cardId: cardId,
      userId: user.id,
    });
  }

  async findAll(user: Users) {
    return await this.commentsRepository.find({ where: { userId: user.id } });
  }

  findOne(id: string) {
    return this.commentsRepository.findOne(id);
  }

  async update(id: string, updateCommentsDto: UpdateCommentsDto) {
    await this.commentsRepository.update(id, updateCommentsDto);

    return await this.commentsRepository.findOne(id);
  }

  async remove(id: string) {
    await this.commentsRepository.delete({ id });

    return { id };
  }
}
