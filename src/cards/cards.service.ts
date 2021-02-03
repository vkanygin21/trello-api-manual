import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Cards } from './cards.entity';
import { Users } from '../users/users.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Cards)
    private readonly cardsRepository: Repository<Cards>,
  ) {}

  async create(entity: DeepPartial<Cards>, user: Users) {
    const saveCard = await this.cardsRepository.save({
      ...entity,
      userId: user.id,
    });

    try {
      return this.cardsRepository.findOne(saveCard.id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(user: Users) {
    return await this.cardsRepository.find({ where: { userId: user.id } });
  }

  findOne(id, options?) {
    return this.cardsRepository.findOne(id, options);
  }

  async update(id: string, entity: DeepPartial<Cards>) {
    await this.cardsRepository.update(id, entity);

    return await this.cardsRepository.findOne(id);
  }

  async remove(id: string) {
    await this.cardsRepository.delete({ id });

    return { id };
  }
}
