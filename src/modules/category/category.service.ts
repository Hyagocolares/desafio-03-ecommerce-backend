// src/modules/category/category.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findProductsByCategoryName(name: string): Promise<Product[]> {
    const category = await this.categoryRepository.findOne({ where: { name } });
    if (!category) {
      throw new Error('Categoria não encontrada');
    }
    return this.productRepository.find({ where: { categoryId: category.id } });
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async create(categoryData: Partial<Category>): Promise<Category> {
    const category = this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(category);
  }

  async update(id: number, categoryData: Partial<Category>): Promise<Category> {
    await this.categoryRepository.update(id, categoryData);
    return this.categoryRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
