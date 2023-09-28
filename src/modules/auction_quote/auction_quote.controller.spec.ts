import { Test, TestingModule } from '@nestjs/testing';
import { AuctionQuoteController } from './auction_quote.controller';

describe('AuctionQuoteController', () => {
  let controller: AuctionQuoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuctionQuoteController],
    }).compile();

    controller = module.get<AuctionQuoteController>(AuctionQuoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
