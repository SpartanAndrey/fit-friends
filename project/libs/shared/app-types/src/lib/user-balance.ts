export type WorkoutsData = {
  id: number;
  quantity: number;
}

export interface UserBalance {
  workouts: WorkoutsData[];
  totalWorkoutQuantity: number;
}
