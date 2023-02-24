import * as Mongoose from 'mongoose';
import { Category } from 'src/packages/types/dtos/category';

export interface CategoryDocument extends Category, Mongoose.Document {}
