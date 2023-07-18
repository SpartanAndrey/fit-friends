import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class UpdateBalanceDto {
  @ApiProperty({
    description: 'Уникальный идентификатор тренировки.',
    example: 300
  })
  public workoutId: number;

  @ApiProperty(
    {
    description: 'Количество тренировок.',
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  public workoutNumber?: number;
}
