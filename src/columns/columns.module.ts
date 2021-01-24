import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Columns } from './column.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Columns]), UsersModule],
  controllers: [ColumnsController],
  providers: [ColumnsService]
})
export class ColumnsModule {}
