import {
  Controller,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuctionQuoteService } from './auction_quote.service';
import { CreateAuctionQuoteDto } from '../../dtos/auction_quote.dto';
import { IResponse } from 'src/interfaces/iresponse';

@Controller('quote')
export class AuctionQuoteController {
  constructor(private readonly auctionQuoteService: AuctionQuoteService) {}

  @Post('/:productId')
  async create(
    @Param('productId') productId: string,
    @Body() createQuoteDto: CreateAuctionQuoteDto,
  ): Promise<IResponse> {
    try {
      return await this.auctionQuoteService.createQuote(
        productId,
        createQuoteDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
