import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserDocument } from '../models/documents/user.document';
import * as _ from 'lodash';
import { EmailLogin, UserData, USER_STATUS } from '../types/dtos/user';
import * as emailAddresses from 'email-addresses';
import * as bcrypt from 'bcrypt';
import ParsedMailbox = emailAddresses.ParsedMailbox;

@Injectable()
export class UserService {
  constructor(
    @InjectModel('UserDataModel')
    private userDataModel: mongoose.Model<UserDocument>,
  ) {}

  async getUser(userId) {
    return await this.userDataModel.findOne({ userId });
  }

  async emailSignUp(emailSignUpRequest: {
    emailId: string;
    password: string;
    firstName: string;
  }): Promise<UserData> {
    const emailParsed = <ParsedMailbox>(
      emailAddresses.parseOneAddress(emailSignUpRequest.emailId)
    );
    if (_.isNil(emailParsed)) {
      throw new BadRequestException('INVALID_EMAIL_ID', {
        cause: new Error(),
        description: 'Email is not Valid',
      });
    }
    const emailId = emailParsed.address;
    const password = emailSignUpRequest.password;
    const firstName = emailSignUpRequest.firstName;

    const existingUserData = await this.userDataModel.findOne({
      emailId: emailId,
      status: USER_STATUS.ACTIVE,
    });

    if (existingUserData) {
      throw new BadRequestException('EMAIL_ID_ALREADY_EXISTS', {
        cause: new Error(),
        description: 'Email already exists',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      emailId: emailId,
      hashedPassword: hashedPassword,
      status: USER_STATUS.ACTIVE,
      firstName: firstName,
    };
    return await this.userDataModel.create(userData);
  }

  async emailLogin(emailLoginRequest: EmailLogin): Promise<UserData> {
    const emailParsed = <ParsedMailbox>(
      emailAddresses.parseOneAddress(emailLoginRequest.emailId)
    );
    if (_.isNil(emailParsed)) {
      throw new BadRequestException('INVALID_EMAIL_ID', {
        cause: new Error(),
        description: 'Email is not Valid',
      });
    }
    const emailId = emailParsed.address;
    const user = await this.userDataModel.findOne({
      emailId: emailId,
      status: USER_STATUS.ACTIVE,
    });
    if (!user) {
      throw new BadRequestException('USER_DATA_NOT_FOUND', {
        cause: new Error(),
        description: 'User Data not found',
      });
    }
    if (_.isEmpty(user.hashedPassword)) {
      throw new BadRequestException('EMAIL_LOGIN_ABSENT', {
        cause: new Error(),
        description: 'email login is not found',
      });
    }

    const isMatch = await bcrypt.compare(
      emailLoginRequest.password,
      user.hashedPassword,
    );

    if (!isMatch) {
      throw new BadRequestException('CREDENTIALS_DOES_NOT_MATCH', {
        cause: new Error(),
        description: 'Credentials are not matching',
      });
    }
    return user;
  }
}
