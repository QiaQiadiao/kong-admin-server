import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Public } from './public.decorator';
@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  @Public()
  @Get('login')
  getTest() {
    return 'ok';
  }
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // token 校验通过后，user 会挂载到 request 上
  }
}
