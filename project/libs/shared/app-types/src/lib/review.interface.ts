export interface Review {
  id?: number;
  userId: string;
  workoutId: number;
  rating: number;
  review: string;
  createdAt: Date;
}
