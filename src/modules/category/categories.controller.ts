// src/modules/category/categories.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { Product } from '../product/product.entity';
import { ProductsPaginationService } from './paginationCategory';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productsPaginationService: ProductsPaginationService,
  ) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(+id);
  }

  @Get(':name/products')
  async findProductsByCategoryName(
    @Param('name') name: string,
  ): Promise<Product[]> {
    return this.productsPaginationService.paginateByCategoryName(name);
  }

  @Post()
  create(@Body() categoryData: Partial<Category>): Promise<Category> {
    return this.categoryService.create(categoryData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() categoryData: Partial<Category>,
  ): Promise<Category> {
    return this.categoryService.update(+id, categoryData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoryService.remove(+id);
  }
}
