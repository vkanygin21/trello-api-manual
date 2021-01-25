import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cards } from './cards.entity';
import { ColumnsModule } from '../columns/columns.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cards]), ColumnsModule],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
