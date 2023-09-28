import { Module } from '@nestjs/common';
import { AuctionQuoteController } from './auction_quote.controller';
import { AuctionQuoteService } from './auction_quote.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AuctionQuote,
  AuctionQuoteSchema,
} from 'src/schemas/auction_quote.schema';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import {
  TradingRecord,
  TradingRecordSchema,
} from 'src/schemas/trading_record.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuctionQuote.name, schema: AuctionQuoteSchema },
      { name: Product.name, schema: ProductSchema },
      { name: TradingRecord.name, schema: TradingRecordSchema },
    ]),
  ],
  controllers: [AuctionQuoteController],
  providers: [AuctionQuoteService],
})
export class AuctionQuoteModule {}
