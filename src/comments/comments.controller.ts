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
import { CommentsOwnerGuard } from './comments.guards';
import { Users } from '../users/users.entity';
import { CardsOwnerGuard } from '../cards/cards.guards';


@ApiBearerAuth()
@ApiTags('comments')
@Controller('/cards/:cardId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {
  }

  @UseGuards(JwtAuthGuard, CardsOwnerGuard)
  @Post()
  create(
    @Body() createCommentsDto: CreateCommentsDto,
    @Param('cardId') cardId: string,
    @CurrentUser() user,
  ) {
    return this.commentsService.create(createCommentsDto, cardId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@CurrentUser() user: Users) {
    return this.commentsService.findAll(user);
  }

  @UseGuards(JwtAuthGuard, CommentsOwnerGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, CommentsOwnerGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentsDto: UpdateCommentsDto,
  ) {
    return this.commentsService.update(id, updateCommentsDto);
  }

  @UseGuards(JwtAuthGuard, CommentsOwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}