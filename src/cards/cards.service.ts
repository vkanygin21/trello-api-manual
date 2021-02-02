import { Injectable } from '@nestjs/common';
import { CreateCardsDto, UpdateCardsDto } from './cards.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cards } from './cards.entity';
import { Users } from '../users/users.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Cards)
    private readonly cardsRepository: Repository<Cards>,
  ) {}

  async create(createCardsDto: CreateCardsDto, columnId: string, user: Users) {
    const createCard = await this.cardsRepository.save({
      ...createCardsDto,
      userId: user.id,
      columnId: columnId,
    });
    return createCard;
  }

  async findAll(user: Users) {
    return await this.cardsRepository.find({ where: { userId: user.id } });
  }

  findOne(id: string) {
    return this.cardsRepository.findOne(id);
  }

  async update(id: string, updateCardsDto: UpdateCardsDto) {
    await this.cardsRepository.update(id, updateCardsDto);

    return await this.cardsRepository.findOne(id);
  }

  async remove(id: string) {
    await this.cardsRepository.delete({ id });

    return { id };
  }
}
