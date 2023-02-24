import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CategoryDocument } from '../models/documents/category.document';
import { STATE } from '../types/dtos/site';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('CategoryModel')
    private categoryModel: mongoose.Model<CategoryDocument>,
  ) {}

  async getCategory(categoryId) {
    return await this.categoryModel.findOne({ categoryId, state:STATE.ACTIVE });
  }

}
