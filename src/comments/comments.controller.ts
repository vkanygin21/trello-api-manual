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
import { CommentsService } from './comments.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCommentsDto, UpdateCommentsDto } from './comments.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentsOwnerGuard } from '../auth/comments-owner.guard';

@ApiBearerAuth()
@ApiTags('comments')
@Controller('/cards/:cardId/comments')
export class CommentsController {
  constructor(private readonly cardsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createCommentsDto: CreateCommentsDto,
    @Param('cardId') cardId: string,
    @CurrentUser() userId: string,
  ) {
    return this.cardsService.create(createCommentsDto, cardId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @UseGuards(JwtAuthGuard, CommentsOwnerGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, CommentsOwnerGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentsDto: UpdateCommentsDto,
  ) {
    return this.cardsService.update(+id, updateCommentsDto);
  }

  @UseGuards(JwtAuthGuard, CommentsOwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(id);
  }
}
