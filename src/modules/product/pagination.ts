// src/modules/product/pagination.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class PaginationService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async paginate(page: number = 1, limit: number = 16): Promise<Product[]> {
    const skip = (page - 1) * limit;
    const [data] = await this.productRepository.findAndCount({
      skip,
      take: limit,
    });

    return data;
  }
}
