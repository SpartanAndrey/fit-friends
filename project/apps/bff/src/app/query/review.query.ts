import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, Max } from 'class-validator';
import { DEFAULT_REVIEW_QUERY_LIMIT, DEFAULT_SORT_DIRECTION, REVIEW_LIMIT_NOT_BE_EXCEEDED } from '../bff.constant';
import { SortType } from '@project/shared/app-types';

export class ReviewQuery {
  
  @Transform(({ value } ) => +value || DEFAULT_REVIEW_QUERY_LIMIT)
  @IsNumber()
  @Max(DEFAULT_REVIEW_QUERY_LIMIT, { message: REVIEW_LIMIT_NOT_BE_EXCEEDED })
  @IsOptional()
  public limit?: number;

  @IsOptional()
  public sortType?: SortType = SortType.CreatedAt;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}
