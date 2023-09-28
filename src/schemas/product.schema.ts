import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ProductStatus {
  AVAILABLE = 'Available',
  SOLD = 'Sold',
}

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  start_price: number;

  @Prop({ required: true })
  reserve_price: number;

  @Prop()
  highest_quote: number;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(ProductStatus),
    default: ProductStatus.AVAILABLE,
  })
  status: ProductStatus;

  @Prop({ required: true })
  seller_id: string;

  @Prop({ required: true, default: Date.now })
  created_at: Date;

  @Prop({ required: true })
  updated_at: Date;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
