// src/modules/category/categories.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from './categories.controller';
import { Category } from './category.entity';
import { Product } from '../product/product.entity';
import { ProductsPaginationService } from './paginationCategory';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  controllers: [CategoryController],
  providers: [CategoryService, ProductsPaginationService],
})
export class CategoriesModule {}
