import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCardsDto, UpdateCardsDto } from './cards.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CardsOwnerGuard } from '../auth/cards-owner.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { userInfo } from 'os';

@ApiBearerAuth()
@ApiTags('cards')
@Controller('/columns/:columnId/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createCardsDto: CreateCardsDto,
    @Param('columnId') columnId: string,
    @CurrentUser() userId: string,
  ) {
    return this.cardsService.create(createCardsDto, columnId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @UseGuards(JwtAuthGuard, CardsOwnerGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, CardsOwnerGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardsDto: UpdateCardsDto) {
    return this.cardsService.update(+id, updateCardsDto);
  }

  @UseGuards(JwtAuthGuard, CardsOwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(id);
  }
}
