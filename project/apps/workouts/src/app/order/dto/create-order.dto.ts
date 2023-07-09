import {ApiProperty} from "@nestjs/swagger";
import { Transform } from 'class-transformer';
import { IsInt, IsPositive, Max, Min } from 'class-validator';
import { OrderType, PaymentType } from "@project/shared/app-types";
import { MAX_WORKOUTS_NUMBER, MIN_WORKOUTS_NUMBER, ORDER_WORKOUTS_NUMBER } from "../order.constant";

export class CreateOrderDto {
  @ApiProperty({
    description: 'Уникальный идентификатор тренировки.',
    example: '10'
  })
  @Transform(({value}) => +value)
  public workoutId: number;

  @ApiProperty({
    description: 'Уникальный идентификатор пользователя.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3'
  })
  public coachId: string;

  @ApiProperty({
    description: 'Вид покупки. Абонемент.',
    example: 'Membership',
    required: true
  })
  public orderType: OrderType;

  @ApiProperty({
    description: 'Стоимость тренировки в рублях. Ограничения: целые числа; число больше или равно 0. Значение 0 подразумевает бесплатную тренировку.',
    example: 1000,
    required: true
  })
  @IsPositive()
  public workoutPrice: number;

  @ApiProperty({
    description: 'Количество приобретаемых тренировок. Минимальное значение 1, максимальное 50.',
    example: 50,
    required: true
  })
  @Min(MIN_WORKOUTS_NUMBER, { message: ORDER_WORKOUTS_NUMBER })
  @Max(MAX_WORKOUTS_NUMBER, { message: ORDER_WORKOUTS_NUMBER })
  @IsInt()
  public quantity: number;

  @ApiProperty({
    description: 'Вариант оплаты заказа. Один из вариантов: visa, mir, umoney.',
    example: 'Visa',
    required: true
  })
  public paymentType: PaymentType;
}
