import { AuctionQuoteDto } from 'src/dtos/auction_quote.dto';
import { ProductDto } from 'src/dtos/product.dto';
import { TradingRecordDto } from 'src/dtos/trading_record.dto';

import { TCode } from 'src/types/tcode';

export interface IResponse {
  code: TCode;
  success: boolean;
  reason?: string;
  data:
    | null
    | AuctionQuoteDto
    | AuctionQuoteDto[]
    | ProductDto
    | ProductDto[]
    | TradingRecordDto
    | TradingRecordDto[]
    | {
        auctionQuote?: AuctionQuoteDto;
        tradingRecord?: TradingRecordDto;
      };
}
