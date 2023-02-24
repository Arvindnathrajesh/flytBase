import * as Mongoose from 'mongoose';
import { Site } from 'src/packages/types/dtos/site';

export interface SiteDocument extends Site, Mongoose.Document {}