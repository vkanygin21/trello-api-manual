import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnsDto, UpdateColumnsDto } from './columns.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ColumnsOwnerGuard } from './columns-owner.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@ApiBearerAuth()
@ApiTags('columns')
@Controller('/users/:userId/columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createColumnDto: CreateColumnsDto, @CurrentUser() user) {
    return this.columnsService.create(createColumnDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.columnsService.findAll();
  }

  @UseGuards(JwtAuthGuard, ColumnsOwnerGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.columnsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, ColumnsOwnerGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnsDto) {
    return this.columnsService.update(id, updateColumnDto);
  }

  @UseGuards(JwtAuthGuard, ColumnsOwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnsService.remove(id);
  }
}
