import { AuctionQuoteDto } from 'src/dtos/auction_quote.dto';

export class AuctionQuoteEntity {
  product_id: string;
  bidder_id: string;
  amount: number;
  timestamp: Date;
}

export const convertEntityToDto = (
  entity: AuctionQuoteEntity,
): AuctionQuoteDto => ({
  productId: entity.product_id,
  bidderId: entity.bidder_id,
  amount: entity.amount,
  timestamp: entity.timestamp,
});
