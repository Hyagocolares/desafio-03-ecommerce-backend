// src/modules/product/product.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 10 })
  sku: string;

  @Column({ name: 'category_id' })
  categoryId: number;

  @Column({ length: 250 })
  description: string;

  @Column({ name: 'large_description', length: 500 })
  largeDescription: string;

  @Column('decimal')
  price: number;

  @Column('decimal', { name: 'discount_price', nullable: true })
  discontPrice: number;

  @Column({ name: 'discount_percent', nullable: true })
  discontPercent: number;

  @Column({ name: 'is_new', default: false })
  isNew: boolean;

  @Column({ name: 'image_link', length: 250, nullable: true })
  imageLink: string;

  @Column({ name: 'other_images_link', length: 1000, nullable: true })
  otherImagesLink: string;

  @Column({ default: null })
  star: number;

  @Column({ default: null })
  review: number;

  @Column({ length: 10, default: null })
  size: string;

  @Column({ length: 20, default: null })
  color: string;

  @Column({ nullable: true })
  amount: number;

  @Column({ length: 100, nullable: true })
  tags: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
