import { Test, TestingModule } from '@nestjs/testing';
import { EmailSubscriberService } from './email-subscriber.service';

describe('EmailSubscriberService', () => {
  let service: EmailSubscriberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailSubscriberService],
    }).compile();

    service = module.get<EmailSubscriberService>(EmailSubscriberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
