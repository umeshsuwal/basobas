import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import type { AuthenticatedRequest } from './auth.types';

function getBearerToken(request: Request) {
  const authorization = request.headers.authorization;
  if (!authorization) return null;

  const [scheme, token] = authorization.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token || token.includes(' ')) {
    return null;
  }

  return token;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = getBearerToken(request);
    if (!token) {
      throw new UnauthorizedException('A bearer token is required');
    }

    const user = await this.authService.validateSession(token);
    if (!user) {
      throw new UnauthorizedException('Invalid or expired session');
    }

    request.user = user;
    return true;
  }
}
