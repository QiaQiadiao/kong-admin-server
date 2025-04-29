import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';
import { JWT_SECRET_KEY } from 'src/global/constName';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('token不存在');
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET_KEY,
      });
      request.user = payload;
    } catch {
      throw new UnauthorizedException('token已失效');
    }
    return true;
  }
}
const extractTokenFromHeader = (request): string => {
  const authHeader =
    request.headers['authorization'] || request.headers['Authorization'];
  if (!authHeader) return '';
  const [type, token] = authHeader.split(' ');
  return type === 'Bearer' ? token : '';
};
