import {ApiProperty} from "@nestjs/swagger";
import { Expose } from 'class-transformer';

export class ReviewRdo {
@ApiProperty({
    description: 'Уникальный идентификатор заказа.',
    example: 300
  })
  @Expose({ name: 'id'})
  public id: number;

  @ApiProperty({
    description: 'Уникальный идентификатор пользователя.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Уникальный идентификатор тренировки.',
    example: '10'
  })
  @Expose()
  public workoutId: number;
  
  @ApiProperty({
    description: 'Оценка исполнителя. Число от 1 до 5.',
    example: '5'
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'Текст отзыва. Минимум 100 символов, максимум 1024 символов.',
    example: 'Нраица, очень нраица.',
  })
  @Expose()
  public text: string;
}
