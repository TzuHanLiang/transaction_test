import { TradingRecordDto } from 'src/dtos/trading_record.dto';

export class TradingRecordEntity {
  product_id: string;
  seller_id: string;
  buyer_id: string;
  final_price: number;
  timestamp: Date;
}

export const convertEntityToDto = (
  entity: TradingRecordEntity,
): TradingRecordDto => ({
  productId: entity.product_id,
  sellerId: entity.seller_id,
  buyerId: entity.buyer_id,
  finalPrice: entity.final_price,
  timestamp: entity.timestamp,
});
