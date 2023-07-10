import { Test, TestingModule } from '@nestjs/testing';
import { EmailSubscriberController } from './email-subscriber.controller';

describe('EmailSubscriberController', () => {
  let controller: EmailSubscriberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailSubscriberController],
    }).compile();

    controller = module.get<EmailSubscriberController>(
      EmailSubscriberController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
