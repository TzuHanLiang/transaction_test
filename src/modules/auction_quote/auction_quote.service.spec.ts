import { Test, TestingModule } from '@nestjs/testing';
import { AuctionQuoteService } from './auction_quote.service';

describe('AuctionQuoteService', () => {
  let service: AuctionQuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuctionQuoteService],
    }).compile();

    service = module.get<AuctionQuoteService>(AuctionQuoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
