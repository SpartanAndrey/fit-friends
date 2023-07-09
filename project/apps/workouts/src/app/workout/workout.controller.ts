import { WorkoutService } from './workout.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { WorkoutRdo } from './rdo/workout.rdo';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkoutCatalogQuery } from './query/workout-catalog.query';
import { WorkoutListQuery } from './query/workout-list.query';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@ApiTags('workouts')
@Controller('workouts')
export class WorkoutController {
  constructor(
    private readonly workoutService: WorkoutService
  ) {}

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.CREATED,
    description: 'The new workout has been successfully created.'
  })
  @Post('/')
  async create(@Body() dto: CreateWorkoutDto) {
    const newWorkout = await this.workoutService.createWorkout(dto);
    return fillObject(WorkoutRdo, newWorkout);
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: 'The workout found.'
  })
  @Get('/:id')
  async show(@Param('id') id: number) {
    const existWorkout = await this.workoutService.getWorkout(id);
    return fillObject(WorkoutRdo, existWorkout);
  }

  @ApiResponse({
    type:  WorkoutRdo,
    status: HttpStatus.CREATED,
    description: 'The workout has been successfully updated.'
  })
  @Patch('/:id')
  async updateStatus(@Param('id') id: number, @Body() dto: UpdateWorkoutDto) {
    const updatedWorkout = await this.workoutService.update(id, dto);
    return fillObject(WorkoutRdo, updatedWorkout);
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: 'The workouts are provided.'
  })
  @Get('/')
  async index(@Query() query: WorkoutCatalogQuery) {
    const workouts = await this.workoutService.getWorkouts(query);
    return fillObject(WorkoutRdo, workouts);
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: 'The coach\'s workouts are provided.'
  })
  @Get('/coach/:coachId')
  async indexCoach(@Param('coachId') coachId: string, @Query() query: WorkoutListQuery) {
    const workouts = await this.workoutService.getCoachWorkouts(coachId, query);
    return fillObject(WorkoutRdo, workouts);
  }

}
