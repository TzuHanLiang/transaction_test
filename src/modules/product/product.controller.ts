import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  ProductStatus,
  UpdateProductDto,
} from '../../dtos/product.dto';
import { IResponse } from 'src/interfaces/iresponse';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<IResponse> {
    return this.productService.findAll();
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<IResponse> {
    return this.productService.create({
      ...createProductDto,
      status: ProductStatus.AVAILABLE,
      createdAt: new Date(),
    });
  }

  @Put('/:productId')
  async update(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<IResponse> {
    return this.productService.update(productId, {
      ...updateProductDto,
      updateAt: new Date(),
    });
  }

  @Delete('/:productId')
  async delete(@Param('productId') productId: string): Promise<IResponse> {
    return await this.productService.delete(productId);
  }
}
