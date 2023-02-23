import * as Mongoose from 'mongoose';
import { Mission } from 'src/packages/types/dtos/mission';

export interface MissionDocument extends Mission, Mongoose.Document {}
