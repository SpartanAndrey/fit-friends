import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { WorkoutEntity } from './workout.entity';
import { Workout } from '@project/shared/app-types';
import { WorkoutCatalogQuery } from './query/workout-catalog.query';
import { WorkoutListQuery } from './query/workout-list.query';

@Injectable()
export class WorkoutRepository implements CRUDRepository<WorkoutEntity, number, Workout> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(entity: WorkoutEntity): Promise<Workout> {
    return this.prisma.workout.create({
      data: { 
        ...entity
      },
    }) as unknown as Workout;
  }

  public async update(workoutId: number, entity: WorkoutEntity): Promise<Workout> {
    return this.prisma.workout.update({
      where: { 
        workoutId 
      },
      data: { 
        ...entity 
      },
    }) as unknown as Workout;
  }

  public async destroy(workoutId: number): Promise<void> {
    await this.prisma.workout.delete({
      where: {
        workoutId,
      }
    });
  }

  public async findById(workoutId: number): Promise<Workout | null> {
    return this.prisma.workout.findFirst({
      where: { 
        workoutId
      },
    }) as unknown as Workout;
  }

  public async find({limit, sortDirection, sortType, page, types, priceMin, priceMax, caloriesMin, caloriesMax, ratingMin, ratingMax}: WorkoutCatalogQuery): Promise<Workout[]> {
    
    return this.prisma.workout.findMany({
      where: {
        AND: [
          { type: { in: types } },
          {price: {
            equals: sortDirection === 'free' ? 0 : undefined,
            lte: priceMax,
            gte: priceMin,
          }},
          {caloriesNumber: {
            lte: caloriesMax,
            gte: caloriesMin,
          }},
          {rating: {
            lte: ratingMax,
            gte: ratingMin,
          }}
        ],
        
      },
      take: limit,
      orderBy: [
        { [sortType]: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    }) as unknown as Workout[];
  }

  public async findCoachWorkouts(coachId: string, {limit, sortDirection, sortType, page, types, priceMin, priceMax, caloriesMin, caloriesMax, ratingMin, ratingMax, times}: WorkoutListQuery): Promise<Workout[]> {
    return this.prisma.workout.findMany({
      where: {
        AND: [
          { coachId: coachId },
          { type: { in: types }},
          {time: { in: times }},
          {price: {
            lte: priceMax,
            gte: priceMin,
          }},
          {caloriesNumber: {
            lte: caloriesMax,
            gte: caloriesMin,
          }},
          {rating: {
            lte: ratingMax,
            gte: ratingMin,
          }},
        ],
      },
      take: limit,
      orderBy: [
        { [sortType]: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    }) as unknown as Workout[];
  }

  public async updateRating(workoutId: number, newRating: number): Promise<Workout> {
    return this.prisma.workout.update({
      where: { 
        workoutId
      },
      data: { 
        rating: newRating
      },
    }) as unknown as Workout;
  }
}