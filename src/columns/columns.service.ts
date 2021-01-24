import { Injectable } from '@nestjs/common';
import { CreateColumnsDto, UpdateColumnsDto } from './columns.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Columns } from './column.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Columns) private readonly columnsRepository: Repository<Columns>,
    private readonly userService: UsersService,
  ) {
  }

 async create(createColumnsDto: CreateColumnsDto, userId: string) {
   const user = await this.userService.findOne({id:userId});
    const column = await this.columnsRepository.create(createColumnsDto);
   console.log(user);
    column.user = user;
   return await this.columnsRepository.save(column);
  }

  async findAll() {
    return await this.columnsRepository.find();
  }

  findOne(id: number) {
    return this.columnsRepository.findOne();
  }

  update(id: number, updateColumnDto: UpdateColumnsDto) {
    return this.columnsRepository.update(id, updateColumnDto);
  }

  remove(id: number) {
    return `This action removes a #${id} column`;
  }
}
