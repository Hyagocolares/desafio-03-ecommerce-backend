// src/modules/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/product/products.module';
import { CategoriesModule } from './modules/category/categories.module';
import { Product } from './modules/product/product.entity';
import { Category } from './modules/category/category.entity';
import { ProductService } from './modules/product/product.service';
import { CategoryService } from './modules/category/category.service';
import { ProductController } from './modules/product/products.controller';
import { CategoryController } from './modules/category/categories.controller';
import { PaginationService } from './modules/product/pagination';
import { ProductsPaginationService } from './modules/category/paginationCategory';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'motty.db.elephantsql.com',
      url: 'postgres://tskajdtg:NlS5I4r0kMBoR1-UJKUlDV-Z4EEbz_qY@motty.db.elephantsql.com/tskajdtg',
      port: 5432,
      username: 'tskajdtg',
      password: 'NlS5I4r0kMBoR1-UJKUlDV-Z4EEbz_qY',
      database: 'tskajdtg',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, Category]),
    ProductsModule,
    CategoriesModule,
  ],
  controllers: [ProductController, CategoryController],
  providers: [
    ProductService,
    CategoryService,
    PaginationService,
    ProductsPaginationService,
  ],
})
export class AppModule {}
