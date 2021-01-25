import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCardsDto, UpdateCardsDto } from './cards.dto';

@ApiTags('cards')
@Controller('/columns/:columnId/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(
    @Body() createCardsDto: CreateCardsDto,
    @Param('columnId') userId: string,
  ) {
    console.log(userId, createCardsDto);
    return this.cardsService.create(createCardsDto, userId);
  }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCardsDto: UpdateCardsDto) {
    return this.cardsService.update(+id, updateCardsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(+id);
  }
}
