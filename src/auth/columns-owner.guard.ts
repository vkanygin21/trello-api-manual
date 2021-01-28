import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { ColumnsService } from '../columns/columns.service';

@Injectable()
export class ColumnsOwnerGuard implements CanActivate {
  constructor(private readonly columnsService: ColumnsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const columnId = request.params.id;
    const currentUserId = request.user.id;
    const [column] = await this.columnsService.findAll({
      where: { id: columnId },
      select: ['userId'],
    });
    if (!column) {
      throw new NotFoundException();
    }

    return currentUserId === column.userId;
  }
}
