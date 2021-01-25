import { Injectable } from '@nestjs/common';
import { CreateCardsDto, UpdateCardsDto } from './cards.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cards } from './cards.entity';
import { ColumnsService } from '../columns/columns.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Cards)
    private readonly cardsRepository: Repository<Cards>,
    private readonly columnsService: ColumnsService,
  ) {}

  async create(createCardsDto: CreateCardsDto, columnId: string) {
    const column = await this.columnsService.findOne({ id: columnId });
    const card = await this.cardsRepository.create(createCardsDto);
    card.column = column;
    return await this.cardsRepository.save(card);
  }

  async findAll() {
    return await this.cardsRepository.find();
  }

  findOne(where) {
    return this.cardsRepository.findOne(where);
  }

  update(id: number, updateCardsDto: UpdateCardsDto) {
    return this.cardsRepository.update(id, updateCardsDto);
  }

  async remove(id: number) {
    await this.cardsRepository.delete({ id });
    return { id };
  }
}
