import { Injectable } from '@nestjs/common';
import { CreateColumnsDto, UpdateColumnsDto } from './columns.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Columns } from './columns.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Columns)
    private readonly columnsRepository: Repository<Columns>,
  ) {}

  async create(createColumnsDto: CreateColumnsDto, user) {
    return this.columnsRepository.save({
      ...createColumnsDto,
      userId: user.id,
    });
  }

  async findAll() {
    return await this.columnsRepository.find();
  }

  findOne(id: string) {
    return this.columnsRepository.findOne(id);
  }

  async update(id: string, updateColumnDto: UpdateColumnsDto) {
    await this.columnsRepository.update(id, updateColumnDto);

    return await this.columnsRepository.findOne(id);
  }

  async remove(id: string) {
    await this.columnsRepository.delete({ id });

    return { id };
  }
}
