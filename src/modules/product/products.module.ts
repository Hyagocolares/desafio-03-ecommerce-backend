// src/modules/product/product.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './products.controller';
import { Product } from './product.entity';
import { PaginationService } from './pagination';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, PaginationService],
})
export class ProductsModule {}
