import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let user = this.usersRepository.create(createUserDto);
    try {
      user = await this.usersRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
    return user;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(where) {
    return this.usersRepository.findOne(where);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update({ id }, updateUserDto);
    return this.findOne({ id });
  }

  async remove(id: string) {
    await this.usersRepository.delete({ id });
    return { id };
  }
}
