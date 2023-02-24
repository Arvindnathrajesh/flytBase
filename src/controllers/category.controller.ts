import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { CategoryService } from 'src/packages/services/category.service';
import { Category } from 'src/packages/types/dtos/category';

@UseGuards(AuthGuard)
@Controller({ path: '/category' })
export class CategoryController {
  constructor(
    @Inject('CategoryService')
    private categoryService: CategoryService,
  ) {}

  @Post('/create')
  public async createCategory(
    @User('userId') userId: number,
    @Body() category: Category,
  ) {
    // return await this.categoryService.createCategory(category, userId);
  }

  @Put('/update')
  public async updateCategory(
    @User('userId') userId: number,
    @Body() category: Category,
  ) {
    // return await this.categoryService.updateCategory(category, userId);
  }

  @Put('/delete')
  public async deleteCategory(
    @User('userId') userId: number,
    @Query('category-id') categoryId: string,
  ) {
    // return await this.categoryService.deleteCategory(categoryId, userId);
  }
}
