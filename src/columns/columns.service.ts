import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Columns } from './columns.entity';
import { Users } from '../users/users.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Columns)
    private readonly columnsRepository: Repository<Columns>,
  ) {}
  async create(entity: DeepPartial<Columns>, user: Users) {
    return this.columnsRepository.save({
      ...entity,
      userId: user.id,
    });
  }

  async findAll(user: Users) {
    return await this.columnsRepository.find({ where: { userId: user.id } });
  }

  findOne(id) {
    return this.columnsRepository.findOne(id);
  }

  async update(id: string, entity: DeepPartial<Columns>) {
    await this.columnsRepository.update(id, entity);

    return await this.columnsRepository.findOne(id);
  }

  async remove(id: string) {
    await this.columnsRepository.delete({ id });

    return { id };
  }
}
