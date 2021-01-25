import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      const insertUser = await this.usersRepository.insert(createUserDto);
      console.log(insertUser);
      return this.findOne({ id: insertUser.identifiers[0] });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(where) {
    // todo: handle 404
    const user = await this.usersRepository.findOne(where);
    if (!user) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne({ id });
    await this.usersRepository.update({ id }, updateUserDto);
    return this.findOne({ id });
  }

  async remove(id: string) {
    await this.findOne({ id });
    await this.usersRepository.delete({ id });
    return { id };
  }
}
