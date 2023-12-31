import { IsIn, IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_QUERY_LIMIT, DEFAULT_SORT_DIRECTION, DEFAULT_SORT_TYPE, MAX_CALORIES_NUMBER, MAX_RATING_NUMBER, MIN_CALORIES_NUMBER, MIN_RATING_NUMBER, WORKOUT_CALORIES_NUMBER, WORKOUT_LIMIT_NOT_BE_EXCEEDED, WORKOUT_RATING_NUMBER } from '../bff.constant';
import { SortType, WorkoutType } from '@project/shared/app-types';

export class WorkoutCatalogQuery {
  @Transform(({ value } ) => +value ||DEFAULT_QUERY_LIMIT)
  @IsNumber()
  @Max(DEFAULT_QUERY_LIMIT, { message: WORKOUT_LIMIT_NOT_BE_EXCEEDED })
  @IsOptional()
  public limit?: number;

  @IsIn(['asc', 'desc', 'free'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' | 'free' = DEFAULT_SORT_DIRECTION;

  @IsOptional()
  public sortType?: SortType = DEFAULT_SORT_TYPE;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;

  @Transform(({ value }) => value.split(',').map((item: string) => item))
  @IsOptional()
  public types?: WorkoutType[];

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  public priceMin?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  public priceMax?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsPositive()
  @Min(MIN_CALORIES_NUMBER, { message: WORKOUT_CALORIES_NUMBER })
  @IsOptional()
  public caloriesMin?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsPositive()
  @Max(MAX_CALORIES_NUMBER, { message: WORKOUT_CALORIES_NUMBER })
  @IsOptional()
  public caloriesMax?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsPositive()
  @Min(MIN_RATING_NUMBER, { message: WORKOUT_RATING_NUMBER })
  @IsOptional()
  public ratingMin?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsPositive()
  @Max(MAX_RATING_NUMBER, { message: WORKOUT_RATING_NUMBER })
  @IsOptional()
  public ratingMax?: number;

  @IsOptional()
  public coachId?: string;
}
