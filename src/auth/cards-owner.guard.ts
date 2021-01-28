import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { CardsService } from '../cards/cards.service';

@Injectable()
export class CardsOwnerGuard implements CanActivate {
  constructor(private readonly cardsService: CardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cardId = request.params.id;
    const currentUserId = request.user.id;
    const [column] = await this.cardsService.findAll({
      where: { id: cardId },
      select: ['userId'],
    });
    if (!column) {
      throw new NotFoundException();
    }
    console.log(column.userId, currentUserId);

    return currentUserId === column.userId;
  }
}
