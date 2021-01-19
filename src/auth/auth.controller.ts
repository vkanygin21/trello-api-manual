import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('auth')
  @ApiBody({ type: 'object', schema: { example: { email: '', password: '' } } })
  @ApiOperation({ summary: 'auth' })
  @Public()
  @Post('auth/login')
  async login(@Body('email') email, @Body('password') password) {
    const currentUser = await this.authService.validateUser(email, password);
    if (currentUser) {
      return this.authService.login(currentUser);
    } else {
      throw new UnauthorizedException();
    }
  }
}
