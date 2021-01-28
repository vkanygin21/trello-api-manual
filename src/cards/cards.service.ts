import { Injectable } from '@nestjs/common';
import { CreateCardsDto, UpdateCardsDto } from './cards.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cards } from './cards.entity';
import { ColumnsService } from '../columns/columns.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Cards)
    private readonly cardsRepository: Repository<Cards>,
    private readonly columnsService: ColumnsService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createCardsDto: CreateCardsDto,
    columnId: string,
    userId: string,
  ) {
    const user = await this.usersService.findOne({ id: userId });
    const column = await this.columnsService.findOne({
      id: columnId,
      userId: userId,
    });
    const card = await this.cardsRepository.create(createCardsDto);
    card.user = user;
    card.column = column;

    return await this.cardsRepository.save(card);
  }

  async findAll(query?: any) {
    return await this.cardsRepository.find(query);
  }

  findOne(where) {
    return this.cardsRepository.findOne(where);
  }

  update(id: number, updateCardsDto: UpdateCardsDto) {
    return this.cardsRepository.update(id, updateCardsDto);
  }

  async remove(id: string) {
    await this.cardsRepository.delete({ id });

    return { id };
  }
}
