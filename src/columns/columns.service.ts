import { Injectable } from '@nestjs/common';
import { CreateColumnsDto, UpdateColumnsDto } from './columns.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Columns } from './columns.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Columns)
    private readonly columnsRepository: Repository<Columns>,
    private readonly userService: UsersService,
  ) {}

  async create(createColumnsDto: CreateColumnsDto, userId: string) {
    const user = await this.userService.findOne({ id: userId });
    const column = this.columnsRepository.create(createColumnsDto);
    column.user = user;

    return await this.columnsRepository.save(column);
  }

  async findAll(query?: any) {
    return await this.columnsRepository.find(query);
  }

  findOne(where) {
    return this.columnsRepository.findOne(where);
  }

  update(id: number, updateColumnDto: UpdateColumnsDto) {
    return this.columnsRepository.update(id, updateColumnDto);
  }

  async remove(id: string) {
    await this.columnsRepository.delete({ id });

    return { id };
  }
}
