import * as Mongoose from 'mongoose';
import { Drone } from 'src/packages/types/dtos/drone';

export interface DroneDocument extends Drone, Mongoose.Document {}
