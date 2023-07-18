import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { CoachIdInterceptor } from '../interceptors/coach-id.interceptor';
import { ApplicationServiceURL } from '../app.config';
import { WorkoutRdo } from '../rdo/workout.rdo';
import { CreateWorkoutDto } from '../dto/create-workout.dto';
import { UpdateWorkoutDto } from '../dto/update-workout.dto';
import { WorkoutCatalogQuery } from '../query/workout-catalog.query';
import { fillWorkoutData } from '../utils/fill-workout-data';
import { WorkoutListQuery } from '../query/workout-list.query';
import { CheckCoachInterceptor } from '../interceptors/check-coach.interceptor';

@ApiTags('workouts')
@Controller('workouts')
export class WorkoutsController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.CREATED,
    description: 'The new workout has been successfully created.'
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CoachIdInterceptor)
  @Post('create')
  public async create(@Body() dto: CreateWorkoutDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Workouts}`, dto);
    return data;
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.CREATED,
    description: 'The workout has been successfully updated.'
  })
  @Patch(':id')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CoachIdInterceptor)
  public async update(@Param('id') id: number, @Body() dto: UpdateWorkoutDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Workouts}/${id}`, dto);
    return data;
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: 'The workout found.'
  })
  @Get(':id')
  @UseGuards(CheckAuthGuard)
  public async show(@Param('id') id: number) {
    
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Workouts}/${id}`);

    const coachData = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${data.coachId}`)).data;
    
    delete data.coachId;
    
    return {...data, coach: coachData};
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: 'The workouts are provided.'
  })
  @Get('/')
  @UseGuards(CheckAuthGuard)
  public async index(@Query() query: WorkoutCatalogQuery) {
    
    const workouts = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Workouts}/`, { params: query })).data;

    return fillWorkoutData(workouts, this.httpService);
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: 'The coach\'s workouts are provided.'
  })
  @Get('/coach/:coachId')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CheckCoachInterceptor)
  async indexCoach(@Param('coachId') coachId: string, @Query() query: WorkoutListQuery) {

    const workouts = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Workouts}/coach/${coachId}`, { params: query })).data;
    return fillWorkoutData(workouts, this.httpService);
  }

}
