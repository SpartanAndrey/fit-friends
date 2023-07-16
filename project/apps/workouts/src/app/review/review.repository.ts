import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewEntity } from './review.entity';
import { Review } from '@prisma/client';
import { ReviewQuery } from './query/review.query';

@Injectable()
export class ReviewRepository implements CRUDRepository<ReviewEntity, number, Review> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: ReviewEntity): Promise<Review> {
    const entityData = item.toObject();
    return this.prisma.review.create({
      data: {
        ...entityData,
      },
    });
  }

  public findById(reviewId: number): Promise<Review | null> {
    return this.prisma.review.findFirst({
      where: {
        reviewId,
      }
    });
  }

  /*public async getWorkoutRatingAvg (workoutId: number): Promise<number> {
    const ratingAvg = await this.prisma.review.aggregate({
      where: {
        workoutId: workoutId,
        },
      _avg: {
        rating: true,
      }
    });

    return ratingAvg._avg.rating;
  }*/

  public async destroy(reviewId: number): Promise<void> {
    await this.prisma.review.delete({
      where: {
        reviewId,
      }
    });
  }

  public update(reviewId: number, item: ReviewEntity): Promise<Review> {
    return Promise.resolve(undefined);
  }

  public async find(workoutId: number, query?: ReviewQuery): Promise<Review[]> {

    const { limit, sortDirection, sortType, page } = query;
    
    return this.prisma.review.findMany({
      where: {
        workoutId: workoutId,
      },
      take: limit,
      orderBy: [
        { [sortType]: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }


}
