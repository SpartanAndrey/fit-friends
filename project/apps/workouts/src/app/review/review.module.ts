import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { WorkoutModule } from '../workout/workout.module';
import { ReviewRepository } from './review.repository';

@Module({
  imports: [WorkoutModule],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  exports: [ReviewRepository]
})
export class ReviewModule {}
