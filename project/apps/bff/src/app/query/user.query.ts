import { SortDirection, SortType, UserLevel, UserLocation, UserRole, WorkoutType } from '@project/shared/app-types';
import { IsIn, IsNumber, IsOptional, IsEnum, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_QUERY_LIMIT, DEFAULT_SORT_DIRECTION_USER, DEFAULT_SORT_TYPE, QUERY_LIMIT } from '../bff.constant';

export class UserQuery {
  @Transform(({ value } ) => +value || DEFAULT_QUERY_LIMIT)
  @IsNumber()
  @Max(DEFAULT_QUERY_LIMIT, { message: QUERY_LIMIT })
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => (value === SortDirection.Ascended ? 1 : -1))
  @IsIn([1, -1])
  @IsOptional()
  public sortDirection?: 1 | -1 = DEFAULT_SORT_DIRECTION_USER;

  @IsOptional()
  public sortType?: SortType = DEFAULT_SORT_TYPE;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;

  @IsEnum(UserRole)
  @IsOptional()
  public role: UserRole;

  @IsEnum(UserLocation)
  @IsOptional()
  @Transform(({ value } ) => value.split(',').map((item: string) => item))
  public location: UserLocation[];

  @IsEnum(UserLevel)
  @IsOptional()
  public level: UserLevel;

  @IsEnum(UserLevel, {each: true})
  @IsOptional()
  @Transform(({ value } ) => value.split(',').map((item: string) => item))
  public workoutType: WorkoutType[];
}
