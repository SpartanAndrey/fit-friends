import dayjs from 'dayjs';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutRepository } from './workout.repository';
import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { WorkoutEntity } from './workout.entity';
import { WorkoutCatalogQuery } from './query/workout-catalog.query';
import { WorkoutListQuery } from './query/workout-list.query';
import { WORKOUT_NOT_AUTHOR, WORKOUT_NOT_FOUND } from './workout.constant';

@Injectable()
export class WorkoutService {
  constructor(
    private readonly workoutRepository: WorkoutRepository,
  ) {}

  async createWorkout(dto: CreateWorkoutDto) {

    const workoutDto = {...dto, createdAt: dayjs().toDate(), rating: 0};
    const workoutEntity = new WorkoutEntity(workoutDto);
    return this.workoutRepository.create(workoutEntity);
  }

  async deleteWorkout(id: number): Promise<void> {
    this.workoutRepository.destroy(id);
  }

  async update(id: number, dto: UpdateWorkoutDto) {
    const { coachId } = dto;
    
    const workout = await this.workoutRepository.findById(id);

    if (!workout) {
      throw new NotFoundException(WORKOUT_NOT_FOUND);
    }

    if (coachId !== workout.coachId) {
      throw new ForbiddenException(WORKOUT_NOT_AUTHOR);
    }

    const workoutEntity = new WorkoutEntity({ ...workout, ...dto });

    return this.workoutRepository.update(id, workoutEntity);
  }


  async getWorkout(id: number) {
    return this.workoutRepository.findById(id);
  }

  async getWorkouts(query: WorkoutCatalogQuery) {
    return this.workoutRepository.find(query);
  }

  async getCoachWorkouts(coachId: string, query: WorkoutListQuery) {
    return this.workoutRepository.findCoachWorkouts(coachId, query);
  }
}