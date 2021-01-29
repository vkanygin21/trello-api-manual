import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { CardsService } from '../cards/cards.service';

@Injectable()
export class CommentsOwnerGuard implements CanActivate {
  constructor(private readonly cardsService: CardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const commentId = request.params.id;
    const currentUserId = request.user.id;
    const [comment] = await this.cardsService.findAll({
      where: { id: commentId },
      select: ['userId'],
    });
    if (!comment) {
      throw new NotFoundException();
    }

    return currentUserId === comment.userId;
  }
}
