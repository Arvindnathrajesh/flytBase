import * as Mongoose from 'mongoose';
import { UserData } from 'src/packages/types/dtos/user';

export interface UserDocument extends UserData, Mongoose.Document {}
