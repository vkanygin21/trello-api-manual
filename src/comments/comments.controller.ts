import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentsDto, UpdateCommentsDto } from './comments.dto';

@ApiTags('comments')
@Controller('/cards/:cardId/comments')
export class CommentsController {
  constructor(private readonly cardsService: CommentsService) {}

  @Post()
  create(
    @Body() createCommentsDto: CreateCommentsDto,
    @Param('cardId') cardId: string,
  ) {
    console.log(cardId, createCommentsDto);
    return this.cardsService.create(createCommentsDto, cardId);
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
  update(
    @Param('id') id: string,
    @Body() updateCommentsDto: UpdateCommentsDto,
  ) {
    return this.cardsService.update(+id, updateCommentsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(+id);
  }
}
