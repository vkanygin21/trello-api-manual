import { BadRequestException, Injectable } from '@nestjs/common';
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
    const saveColumn = await this.columnsRepository.save({
      ...entity,
      userId: user.id,
    });

    try {
      return this.columnsRepository.findOne(saveColumn.id)
    }

    catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll(user: Users) {
    return await this.columnsRepository.find({ where: { userId: user.id } });
  }

  findOne(id, options?) {
    return this.columnsRepository.findOne(id, options);
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
