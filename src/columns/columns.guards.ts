import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';

@Injectable()
export class ColumnsOwnerGuard implements CanActivate {
  constructor(private readonly columnsService: ColumnsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const query = request.query.columnId;
    console.log(query);
    const columnId = await request.params.id;
    const filter = columnId || query;
    const currentUserId = await request.user.id;
    const column = await this.columnsService.findOne(query);

    if (!column) {
      throw new NotFoundException();
    }

    return currentUserId === column.userId;
  }
}
