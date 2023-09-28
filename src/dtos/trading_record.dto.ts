import { TradingRecordEntity } from 'src/entities/trading_record.entity';

export class TradingRecordDto {
  productId: string;
  sellerId: string;
  buyerId: string;
  finalPrice: number;
  timestamp: Date;
}

export const convertDtoToEntity = (
  dto: TradingRecordDto,
): TradingRecordEntity => ({
  product_id: dto.productId,
  seller_id: dto.sellerId,
  buyer_id: dto.buyerId,
  final_price: dto.finalPrice,
  timestamp: dto.timestamp,
});
