import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnsDto, UpdateColumnsDto } from './columns.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('columns')
@Controller('/users/:userId/columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  create(
    @Body() createColumnDto: CreateColumnsDto,
    @Param('userId') userId: string,
  ) {
    console.log(userId, createColumnDto);
    return this.columnsService.create(createColumnDto, userId);
  }

  @Get()
  findAll() {
    return this.columnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnsDto) {
    return this.columnsService.update(+id, updateColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnsService.remove(+id);
  }
}
