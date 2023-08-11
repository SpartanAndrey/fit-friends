export type Review = {
  id?: number;
  userId: string;
  workoutId: number;
  rating: number;
  text: string;
  createdAt: Date;
}
