// src/modules/product/product.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { PaginationService } from './pagination';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly paginationService: PaginationService,
  ) {}

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '16',
  ): Promise<Product[]> {
    const pageNumber = parseInt(page, 10);
    const perPage = parseInt(limit, 10);
    return await this.paginationService.paginate(pageNumber, perPage);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(+id);
  }

  @Post()
  async create(@Body() productData: Partial<Product>): Promise<Product> {
    try {
      return await this.productService.create(productData);
    } catch (error: any) {
      let errorMessage = 'Erro ao criar o produto';
      if (error instanceof Error && 'message' in error) {
        errorMessage += `: ${error.message}`;
      }
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() productData: Partial<Product>,
  ): Promise<Product> {
    return this.productService.update(+id, productData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(+id);
  }
}
