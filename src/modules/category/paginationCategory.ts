// src/modules/category/products.pagination.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/product.entity';
import { Category } from './category.entity';

@Injectable()
export class ProductsPaginationService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async paginateByCategoryName(
    name: string,
    page: number = 1,
    limit: number = 16,
  ): Promise<Product[]> {
    const skip = (page - 1) * limit;

    const category = await this.categoryRepository.findOne({ where: { name } });
    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    const data = await this.productRepository.find({
      where: { categoryId: category.id },
      take: limit,
      skip,
    });

    return data;
  }
}
