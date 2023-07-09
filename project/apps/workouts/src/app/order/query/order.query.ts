import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, Max } from 'class-validator';
import { DEFAULT_ORDER_QUERY_LIMIT, DEFAULT_SORT_DIRECTION, ORDER_LIMIT_NOT_BE_EXCEEDED } from '../order.constant';
import { OrderSortType } from '@project/shared/app-types';

export class OrderQuery {
  
  @Transform(({ value } ) => +value || DEFAULT_ORDER_QUERY_LIMIT)
  @IsNumber()
  @Max(DEFAULT_ORDER_QUERY_LIMIT, { message: ORDER_LIMIT_NOT_BE_EXCEEDED })
  @IsOptional()
  public limit?: number;

  @IsOptional()
  public sortType?: OrderSortType = OrderSortType.Quantity;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}
