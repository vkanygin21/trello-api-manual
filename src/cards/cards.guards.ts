import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { ColumnsService } from "../columns/columns.service";

@Injectable()
export class CardsOwnerGuard implements CanActivate {
  constructor(private readonly cardsService: CardsService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cardId = request.params.id;
    const currentUserId = request.user.id;
    const card = await this.cardsService.findOne(cardId);

    if (!card) {
      throw new NotFoundException();
    }
    return currentUserId === card.userId;
  }
}

export class CardCreateGuard implements CanActivate {
  constructor(private readonly columnsService: ColumnsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const query = request.query.columnId;
    console.log(query);
    const currentUserId = await request.user.id;
    const column = await this.columnsService.findOne(query);

    if (!column) {
      throw new NotFoundException();
    }

    return currentUserId === column.userId;
  }
}
