import { AuctionQuoteEntity } from 'src/entities/auction_quote.entity';

export class AuctionQuoteDto {
  productId: string;
  bidderId: string;
  amount: number;
  timestamp: Date;
}

export class CreateAuctionQuoteDto {
  readonly bidderId: string;
  readonly amount: number;
}

export const convertDtoToEntity = (
  dto: AuctionQuoteDto,
): AuctionQuoteEntity => ({
  product_id: dto.productId,
  bidder_id: dto.bidderId,
  amount: dto.amount,
  timestamp: dto.timestamp,
});
