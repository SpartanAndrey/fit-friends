import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { ApplicationServiceURL } from '../app.config';
import { ReviewRdo } from '../rdo/review.rdo';
import { CreateReviewDto } from '../dto/create-review.dto';
import { ReviewQuery } from '../query/review.query';
import { UserIdInterceptor } from '../interceptors/user-id.interceptor';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.CREATED,
    description: 'The new review has been successfully created.'
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreateReviewDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Reviews}/`, dto);
    return data;
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.OK,
    description: 'The reviews are provided.'
  })
  @Get(':workoutId')
  @UseGuards(CheckAuthGuard)
  async indexCoach(@Param('workoutId') workoutId: number, @Query() query: ReviewQuery) {

    const { data } = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Reviews}/${workoutId}`, { params: query })).data;
    
    return data;
  }

}
