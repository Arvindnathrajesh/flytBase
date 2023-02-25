import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { setObjProps } from '../common-utils/common-utils';
import { CategoryDocument } from '../models/documents/category.document';
import { Category } from '../types/dtos/category';
import { STATE } from '../types/dtos/site';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('CategoryModel')
    private categoryModel: mongoose.Model<CategoryDocument>,
  ) {}

  async getCategory(categoryId) {
    return await this.categoryModel.findOne({
      categoryId,
      state: STATE.ACTIVE,
    });
  }

  async createCategory(category: Category, userId) {
    if (!category.categoryId) {
      throw new BadRequestException('CATEGORY_ID_CANNOT_BE_EMPTY', {
        cause: new Error(),
        description: 'CATEGORY_ID_CANNOT_BE_EMPTY',
      });
    }
    const existingCategory = await this.getCategory(category.categoryId);
    if (existingCategory) {
      throw new BadRequestException('CATEGORY_ALREADY_EXISTS', {
        cause: new Error(),
        description: 'CATEGORY_ALREADY_EXISTS',
      });
    }

    const newCategory: Category = {
      categoryId: category.categoryId,
      userId: userId,
      name: category.name,
      color: category.color,
      tagName: category.tagName,
    };
    return await this.categoryModel.create(newCategory);
  }

  async updateCategory(
    updatedCategory: Category,
    categoryId: string,
    userId: number,
  ) {
    const category: CategoryDocument = await this.getCategory(categoryId);
    if (!category) {
      throw new BadRequestException('CATEGORY_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'CATEGORY_DOES_NOT_EXIST',
      });
    }
    if (category.userId !== userId) {
      throw new BadRequestException('CATEGORY_DOES_NOT_BELONG_TO_USER', {
        cause: new Error(),
        description: 'CATEGORY_DOES_NOT_BELONG_TO_USER',
      });
    }

    const props: (keyof Category)[] = ['color', 'name', 'tagName'];
    setObjProps(props, category, updatedCategory);
    await category.save();
    return category.toObject();
  }

  async deleteCategory(categoryId, userId) {
    const category: CategoryDocument = await this.getCategory(categoryId);
    if (!category) {
      throw new BadRequestException('CATEGORY_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'CATEGORY_DOES_NOT_EXIST',
      });
    }
    if (category.userId !== userId) {
      throw new BadRequestException('CATEGORY_DOES_NOT_BELONG_TO_USER', {
        cause: new Error(),
        description: 'CATEGORY_DOES_NOT_BELONG_TO_USER',
      });
    }
    return await this.categoryModel.findOneAndUpdate(
      { categoryId, userId },
      { $set: { state: STATE.INACTIVE } },
      { new: true },
    );
  }
}
