import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteNotificationDto {
  @ApiProperty({
    description: 'Текст оповещения',
    example: 'Тебя добавил какой-то тренеришка.'
  })
  @IsString()
  public notificationText: string;
}
