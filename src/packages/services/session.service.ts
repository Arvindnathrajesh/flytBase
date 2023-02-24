import * as jwt from 'jsonwebtoken';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { ApiConfig, SessionPayload } from '../types/dtos/user';

@Injectable()
export class SessionService {
  public readonly verifyLoginMiddleware;

  constructor(
  ) {}

  async createJwtSession(sessionPayload: SessionPayload): Promise<string> {
    return SessionService.signJWT(
      sessionPayload as unknown as Record<string, unknown>,
      'secret',
    );
  }

  public static verifyJWT<T>(token: string, secretToken: string): T {
    let decoded: string | JwtPayload;
    try {
      decoded = jwt.verify(token, secretToken);
    } catch (err) {
      switch (err.name) {
        case 'TokenExpiredError':
            throw new BadRequestException('TOKEN_EXPIRED', { cause: new Error(), description: 'Token Expired' })
        case 'JsonWebTokenError':
            throw new BadRequestException('INVALID_TOKEN', { cause: new Error(), description: 'Invalid Token' })
        default:
          throw err;
      }
    }
    return decoded as T;
  }

  public static signJWT<T>(
    payload: any | T,
    secretToken: string,
  ): string {
    return jwt.sign(payload, secretToken);
  }

}