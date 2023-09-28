import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AuctionQuote {
  @Prop({ required: true, ref: 'Product' })
  product_id: string;

  @Prop({ required: true })
  bidder_id: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, default: Date.now })
  timestamp: Date;
}

export type AuctionQuoteDocument = AuctionQuote & Document;
export const AuctionQuoteSchema = SchemaFactory.createForClass(AuctionQuote);
