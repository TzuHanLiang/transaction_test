import { ProductEntity } from 'src/entities/product.entity';

export enum ProductStatus {
  AVAILABLE = 'Available',
  SOLD = 'Sold',
}

export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly startPrice: number;
  readonly reservePrice: number;
  readonly status: ProductStatus;
  readonly sellerId: string;
  createdAt?: Date;
}

export class UpdateProductDto {
  readonly name?: string;
  readonly description?: string;
  readonly startPrice?: number;
  readonly reservePrice?: number;
  readonly status?: ProductStatus;
  readonly highestQuote?: number;
  updateAt?: Date;
}

export class ProductDto {
  id: string;
  name: string;
  description: string;
  startPrice: number;
  reservePrice: number;
  highestQuote?: number;
  status: ProductStatus;
  sellerId: string;
  createdAt: Date;
  updateAt: Date;
}

export const convertCreateDtoToEntity = (
  dto: CreateProductDto,
): ProductEntity => {
  return {
    name: dto.name,
    description: dto.description,
    start_price: dto.startPrice,
    reserve_price: dto.reservePrice,
    highest_quote: 0,
    status: dto.status,
    seller_id: dto.sellerId,
    created_at: dto.createdAt,
    updated_at: dto.createdAt,
  };
};

export const convertUpdateDtoToEntity = (dto: UpdateProductDto) => {
  return {
    name: dto.name,
    description: dto.description,
    start_price: dto.startPrice,
    reserve_price: dto.reservePrice,
    highest_quote: 0,
    status: dto.status,
    updated_at: dto.updateAt,
  };
};

export const convertDtoToEntity = (dto: ProductDto): ProductEntity => {
  return {
    name: dto.name,
    description: dto.description,
    start_price: dto.startPrice,
    reserve_price: dto.reservePrice,
    highest_quote: dto.highestQuote,
    status: dto.status,
    seller_id: dto.sellerId,
    created_at: dto.createdAt,
    updated_at: dto.updateAt,
  };
};
