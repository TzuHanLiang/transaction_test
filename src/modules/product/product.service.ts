import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../schemas/product.schema';
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from '../../dtos/product.dto';
import { convertEntityToDto } from 'src/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(): Promise<ProductDto[]> {
    return (await this.productModel.find().exec()).map((entity) =>
      convertEntityToDto(entity),
    );
  }

  async create(createProductDto: CreateProductDto): Promise<ProductDto> {
    const createdProduct = new this.productModel(createProductDto);
    return convertEntityToDto(await createdProduct.save());
  }

  async update(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    return convertEntityToDto(
      await this.productModel.findByIdAndUpdate(productId, updateProductDto, {
        new: true,
      }),
    );
  }

  async delete(productId: string): Promise<void> {
    await this.productModel.findByIdAndDelete(productId);
  }
}
