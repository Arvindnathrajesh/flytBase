import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SessionService } from 'src/packages/services/session.service';
import { SessionPayload, UserRequest } from 'src/packages/types/dtos/user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('SessionService')
    private sessionService: SessionService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const token = req.header('x-auth-token');

      if (!token) {
        throw new BadRequestException('TOKEN_NOT_PRESENT', {
          cause: new Error(),
          description: 'TOKEN_NOT_PRESENT',
        });
      }

      const decoded = SessionService.verifyJWT<SessionPayload>(token, 'secret');
      const userRequest = req as UserRequest;
      userRequest.user = decoded.user;
      return true;
    } catch (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          throw new BadRequestException('TOKEN_EXPIRED', {
            cause: new Error(),
            description: 'TOKEN_EXPIRED',
          });
        case 'JsonWebTokenError':
          throw new BadRequestException('INVALID_TOKEN', {
            cause: new Error(),
            description: 'INVALID_TOKEN',
          });
        default:
          throw err;
      }
    }
  }
}
