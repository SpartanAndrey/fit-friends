import dayjs from 'dayjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewEntity } from './review.entity';
import { ReviewQuery } from './query/review.query';
import { WorkoutRepository } from '../workout/workout.repository';
import { WORKOUT_NOT_FOUND } from '../workout/workout.constant';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly workoutRepository: WorkoutRepository,
  ) {}
  
  public async create(dto: CreateReviewDto) {
    const review = {...dto, createdAt: dayjs().toDate()};

    const { workoutId } = dto;

    const reviewEntity = await new ReviewEntity(review);

    const workout = await this.workoutRepository.findById(workoutId);

    if (!workout) {
      throw new NotFoundException(WORKOUT_NOT_FOUND);
    }

    const newReview =  this.reviewRepository.create(reviewEntity);

    const reviews = await this.reviewRepository.find(workoutId);

    const ratings = reviews.map((review) => review.rating);

    const updatedRating = Math.floor(ratings.reduce((a,b) => a+b) / ratings.length);

    await this.workoutRepository.updateRating(workoutId, updatedRating);

    return newReview;
  }

  public async getReview(id: number) {
    return this.reviewRepository.findById(id);
  }

  public async delete(id: number) {
    return this.reviewRepository.destroy(id);
  }

  async getOrders(workoutId: number, query: ReviewQuery) {
    return this.reviewRepository.find(workoutId, query);
  }

}
