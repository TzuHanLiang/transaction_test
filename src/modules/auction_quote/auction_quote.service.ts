import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AuctionQuote } from '../../schemas/auction_quote.schema';
import { Product } from '../../schemas/product.schema';
import {
  AuctionQuoteDto,
  CreateAuctionQuoteDto,
  convertDtoToEntity,
} from '../../dtos/auction_quote.dto';
import { convertEntityToDto } from 'src/entities/auction_quote.entity';
import { convertEntityToDto as convertTradingRecordToDto } from 'src/entities/trading_record.entity';
import { TradingRecord } from 'src/schemas/trading_record.schema';
import { ProductStatus } from 'src/entities/product.entity';
import { IResponse } from 'src/interfaces/iresponse';
import { Code } from 'src/types/tcode';
import { TradingRecordDto } from 'src/dtos/trading_record.dto';

@Injectable()
export class AuctionQuoteService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(TradingRecord.name)
    private tradingRecordModel: Model<TradingRecord>,
    @InjectModel(AuctionQuote.name)
    private auctionQuoteModel: Model<AuctionQuote>,
  ) {}

  async createQuote(
    productId: string,
    createQuoteDto: CreateAuctionQuoteDto,
  ): Promise<IResponse> {
    const session = await this.connection.startSession();
    session.startTransaction();
    const response: IResponse = {
      success: false,
      code: Code.FAILURE,
      reason: '',
      data: null,
    };
    let auctionQuote: AuctionQuoteDto, tradingRecord: TradingRecordDto;
    try {
      const product = await this.productModel.findById(productId);
      if (!product) throw new NotFoundException('Product not found');

      if (product.status !== 'Available')
        throw new BadRequestException('Product is not available for quoting');

      if (
        (createQuoteDto.amount < product.start_price ||
          createQuoteDto.amount < product.highest_quote) ??
        0
      )
        throw new BadRequestException('quote amount is too low');

      const createdQuote = new this.auctionQuoteModel(
        convertDtoToEntity({
          ...createQuoteDto,
          productId,
          timestamp: new Date(),
        }),
      );
      auctionQuote = convertEntityToDto(await createdQuote.save({ session }));

      product.highest_quote = createQuoteDto.amount;

      if (createQuoteDto.amount >= product.reserve_price) {
        product.status = ProductStatus.SOLD;
        const record = new this.tradingRecordModel({
          product_id: product._id,
          seller_id: product.seller_id,
          buyer_id: createQuoteDto.bidderId,
          final_price: createQuoteDto.amount,
          timestamp: new Date(),
        });
        tradingRecord = convertTradingRecordToDto(
          await record.save({ session }),
        );
      }
      await product.save({ session });
      // Throw an error to test transaction rollback
      // throw new Error('This is a test error');

      response.success = true;
      response.code = Code.SUCCESS;
      response.data = { auctionQuote, tradingRecord };
      await session.commitTransaction();
    } catch (error) {
      console.log(`[AuctionQuoteService] createQuote error`, error);
      await session.abortTransaction();
      console.log(`[AuctionQuoteService] createQuote abortTransaction`);
      response.reason = error.message;
    } finally {
      session.endSession();
      console.log(`[AuctionQuoteService] createQuote endSession`);
    }
    return response;
  }

  async getQuotesByProductId(productId: string): Promise<AuctionQuoteDto[]> {
    return (await this.auctionQuoteModel.find({ productId })).map((entity) =>
      convertEntityToDto(entity),
    );
  }
}
