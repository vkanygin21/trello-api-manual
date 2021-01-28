import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);
      const saveUser = await this.usersRepository.save({
        ...createUserDto,
        password: hashPassword,
      });
      return this.usersRepository.findOne(saveUser.id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(where) {
    return await this.usersRepository.findOne(where);
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update({ id: userId }, updateUserDto);
  }

  async remove(id: string) {
    await this.usersRepository.findOne({ id });
    await this.usersRepository.delete({ id });

    return { id };
  }
}
