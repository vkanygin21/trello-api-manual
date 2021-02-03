import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { CardsService } from './cards.service';

@Injectable()
export class CardsOwnerGuard implements CanActivate {
  constructor(private readonly cardsService: CardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cardId = request.body.cardId || request.params.id;
    const currentUserId = request.user.id;
    const card = await this.cardsService.findOne(
      { cardId },
      { select: 'userId' },
    );

    if (!card) {
      throw new NotFoundException();
    }
    return currentUserId === card.userId;
  }
}
