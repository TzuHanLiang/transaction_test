import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TradingRecord {
  @Prop({ required: true, ref: 'Product' })
  product_id: string;

  @Prop({ required: true })
  seller_id: string;

  @Prop({ required: true })
  buyer_id: string;

  @Prop({ required: true })
  final_price: number;

  @Prop({ required: true, default: Date.now })
  timestamp: Date;
}

export type TradingRecordDocument = TradingRecord & Document;
export const TradingRecordSchema = SchemaFactory.createForClass(TradingRecord);
