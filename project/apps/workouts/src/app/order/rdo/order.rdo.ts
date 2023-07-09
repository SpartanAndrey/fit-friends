import {ApiProperty} from "@nestjs/swagger";
import { Expose } from 'class-transformer';
import { OrderType } from "@project/shared/app-types";

export class OrderRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор заказа.',
    example: 300
  })
  @Expose({ name: 'id'})
  public id: number;

  @ApiProperty({
    description: 'Уникальный идентификатор тренировки.',
    example: '10'
  })
  @Expose()
  public workoutId: number;

  @ApiProperty({
    description: 'Уникальный идентификатор пользователя.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Вид покупки. Абонемент.',
    example: 'membership',
    required: true
  })
  @Expose()
  public type: OrderType;

  @ApiProperty({
    description: 'Стоимость тренировки в рублях. Ограничения: целые числа; число больше или равно 0. Значение 0 подразумевает бесплатную тренировку.',
    example: 1000,
    required: true
  })
  @Expose()
  public workoutPrice: number;

  @ApiProperty({
    description: 'Количество приобретаемых тренировок. Минимальное значение 1, максимальное 50.',
    example: 50,
    required: true
  })
  @Expose()
  public quantity: number;

  @ApiProperty({
    description: 'Стоимость заказа. Рассчитывается по формуле: количество * цена тренировки.',
    example: 10000,
    required: true
  })
  @Expose()
  public totalPrice: number;

  @ApiProperty({
    description: 'Вариант оплаты заказа. Один из вариантов: visa, mir, umoney.',
    example: 'visa',
    required: true
  })
  @Expose()
  public paymentType: OrderType;

  @ApiProperty({
    description: 'Дата создания.',
    example: '2023-07-08'
  })
  @Expose()
  public createdAt: Date;
}
