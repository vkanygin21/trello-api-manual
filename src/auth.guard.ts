import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    req['user'] = await this.usersService.findOne(1);

    return true;
  }
}
