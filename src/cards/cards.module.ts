import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cards } from './cards.entity';
import { User } from '../users/user.entity';
import { Columns } from '../columns/columns.entity';
import { ColumnsModule } from '../columns/columns.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cards, User, Columns]),
    ColumnsModule,
    UsersModule,
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
