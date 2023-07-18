import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRdo } from './rdo/review.rdo';
import { ReviewQuery } from './query/review.query';


@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService
  ) {}


  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new review has been successfully created.'
  })
  @Post('/')
  public async create(@Body() dto: CreateReviewDto) {
    const newReview = await this.reviewService.createReview(dto);
    return fillObject(ReviewRdo, newReview);
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.OK,
    description: 'The reviews are provided.'
  })
  @Get(':workoutId')
  public async index(@Param('workoutId') workoutId: number, @Query() query: ReviewQuery) {
    const review = await this.reviewService.getReviews(workoutId, query);
    return fillObject(ReviewRdo, review);
  }

}