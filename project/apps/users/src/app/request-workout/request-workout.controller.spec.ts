import { Test, TestingModule } from '@nestjs/testing';
import { RequestWorkoutController } from './request-workout.controller';

describe('RequestWorkoutController', () => {
  let controller: RequestWorkoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestWorkoutController],
    }).compile();

    controller = module.get<RequestWorkoutController>(RequestWorkoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
