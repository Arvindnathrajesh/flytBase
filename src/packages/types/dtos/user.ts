export enum USER_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DEACTIVATED = 'DEACTIVATED',
  DELETED = 'DELETED',
  BANNED = 'BANNED',
  SYSTEM_CREATED = 'SYSTEM_CREATED',
}

export interface UserRequest extends Request {
    user: {
      userId: number;
    };
  }
  
  export interface SessionPayload {
    user: {
      userId: number;
    };
  }

export interface ApiConfig {
    jwtExpiry: number;
    websiteUrl: string;
}

export class UserToken {
    userId: number;
    token: string;
    emailLoginMethod: boolean;
}

export class EmailLogin {
    emailId: string;
    password: string;
}


export class UserData {
  userId: number;
  emailId: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  hashedPassword?: string;
  status: USER_STATUS;
  createdAt?: Date;
  updatedAt?: Date;
}
