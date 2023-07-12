import { Test, TestingModule } from '@nestjs/testing';
import { RequestWorkoutService } from './request-workout.service';

describe('RequestWorkoutService', () => {
  let service: RequestWorkoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestWorkoutService],
    }).compile();

    service = module.get<RequestWorkoutService>(RequestWorkoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
