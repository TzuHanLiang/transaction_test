import { ProductDto } from 'src/dtos/product.dto';

export enum ProductStatus {
  AVAILABLE = 'Available',
  SOLD = 'Sold',
}

export class ProductEntity {
  name: string;
  description: string;
  start_price: number;
  reserve_price: number;
  highest_quote?: number;
  status: ProductStatus;
  seller_id: string;
  created_at: Date;
  updated_at: Date;
}

export const convertEntityToDto = (entity: ProductEntity): ProductDto => {
  return {
    name: entity.name,
    description: entity.description,
    startPrice: entity.start_price,
    reservePrice: entity.reserve_price,
    highestQuote: entity.highest_quote,
    status: entity.status,
    sellerId: entity.seller_id,
    createdAt: entity.created_at,
    updateAt: entity.updated_at,
  };
};
