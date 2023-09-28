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
  ProductDto,
  UpdateProductDto,
} from '../../dtos/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<ProductDto[]> {
    return this.productService.findAll();
  }

  @Post('create')
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    return this.productService.create({
      ...createProductDto,
      createdAt: new Date(),
    });
  }

  @Put('update/:productId')
  async update(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    return this.productService.update(productId, {
      ...updateProductDto,
      updateAt: new Date(),
    });
  }

  @Delete('delete/:productId')
  async delete(@Param('productId') productId: string): Promise<string> {
    await this.productService.delete(productId);
    return 'Product deleted successfully';
  }
}
