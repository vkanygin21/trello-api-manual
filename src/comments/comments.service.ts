import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Comments } from './comments.entity';
import { Users } from '../users/users.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
  ) {}

  async create(entity: DeepPartial<Comments>, user: Users) {
    const saveComment = await this.commentsRepository.save({
      ...entity,
      userId: user.id,
    });

    try {
      return this.commentsRepository.findOne(saveComment.id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(user: Users) {
    return await this.commentsRepository.find({ where: { userId: user.id } });
  }

  findOne(id, options?) {
    return this.commentsRepository.findOne(id, options);
  }

  async update(id: string, entity: DeepPartial<Comments>) {
    await this.commentsRepository.update(id, entity);

    return await this.commentsRepository.findOne(id);
  }

  async remove(id: string) {
    await this.commentsRepository.delete({ id });

    return { id };
  }
}
