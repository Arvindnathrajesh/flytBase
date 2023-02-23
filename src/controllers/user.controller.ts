import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    Query,
    UseGuards,
    ValidationError,
  } from '@nestjs/common';
import { SessionService } from 'src/packages/services/session.service';
import { UserService } from 'src/packages/services/user.service';
import { EmailLogin, UserToken } from 'src/packages/types/dtos/user';
import * as _ from 'lodash';
  
  @Controller({ path: '/user' })
  export class UserController {
    constructor(
      @Inject('UserService')
      private userService: UserService,
      @Inject('SessionService')
      private sessionService: SessionService,
    ) {}
  
    @Get('')
    public async getUsers() {
      return await this.userService.getUsers();
    }

    @Post('/email/sign-up')
    public async emailSignUp(
      @Body()
      signUpBody: {
        emailId: string;
        password: string;
        firstName: string;
      },
    ): Promise<UserToken> {
      const userData = await this.userService.emailSignUp(signUpBody);
      const token = await this.sessionService.createJwtSession({
        user: { userId: userData.userId },
      });
      return {
        userId: userData.userId,
        token: token,
        emailLoginMethod: !_.isEmpty(userData.hashedPassword),
      };
    }

    @Post('/email/log-in')
    public async emailLogin(@Body() emailLogin: EmailLogin): Promise<UserToken> {
    const userData = await this.userService.emailLogin(emailLogin);
    const token = await this.sessionService.createJwtSession({
        user: { userId: userData.userId },
    });
    return {
        userId: userData.userId,
        token: token,
        emailLoginMethod: !_.isEmpty(userData.hashedPassword),
    };
    }

}
  