import { Review } from '@project/shared/app-types';

export class ReviewEntity implements Review {
  public id: number;
  public userId: string;
  public workoutId: number;
  public rating: number;
  public text: string;
  public createdAt: Date;

  constructor(review: Review) {
    this.fillEntity(review);
  }

  public fillEntity(review: Review) {
    this.id = review.id;
    this.userId= review.userId;
    this.workoutId = review.workoutId;
    this.rating = review.rating;
    this.text = review.text;
    this.createdAt = review.createdAt;
  }

  public toObject() {
    return {
      ...this
    };
  }
}
