import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsPositive, IsOptional, IsInt, Max, Min, IsBoolean } from 'class-validator';
import { MAX_CALORIES_NUMBER, MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH, MIN_CALORIES_NUMBER, MIN_DESCRIPTION_LENGTH, MIN_TITLE_LENGTH, WORKOUT_CALORIES_NUMBER, WORKOUT_DESCRIPTION_LENGTH, WORKOUT_TITLE_LENGTH,  } from '../workout.constant';
import { UserLevel, WorkoutGender, WorkoutTime, WorkoutType } from '@project/shared/app-types';

export class UpdateWorkoutDto {
  @ApiProperty({
    description: 'Название тренировки. Минимальная длина 1 символ, максимальная длина 15 символов.',
    example: 'Лучшая треня',
  })
  @Length(MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, { message: WORKOUT_TITLE_LENGTH })
  @IsString()
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: 'Фоновая картинка для карточки тренировки. Изображение в формате jpg/png.',
    example: 'image.png',
  })
  @IsOptional()
  public backgroundImage?: string;

  @ApiProperty({
    description: 'Описание тренировки. Минимальная длина 10 символов; максимальная длина 140 символов.',
    example: 'Добавить нечего, просто лучшая.',
  })
  @Length(MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH, { message: WORKOUT_DESCRIPTION_LENGTH })
  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя. Допустимые значения: новичок, любитель, профессионал.',
    example: 'новичок'
  })
  @IsOptional()
  public level?: UserLevel;

  @ApiProperty({
    description: 'Одно значение из списка: йога, бег, бокс, стрейчинг, кроссфит, аэробика, пилатес.',
    example: 'новичок',
  })
  @IsOptional()
  public type?: WorkoutType;

  @ApiProperty({
    description: 'Время на тренировку указывается в предопределённых интервалах. Один из вариантов: 10-30 мин, `30-50 мин, 50-80 мин, 80-100 мин.',
    example: '10-30 мин'
  })
  @IsOptional()
  public time?: WorkoutTime;

  @ApiProperty({
    description: 'Одно из трёх значений: для женщин, для мужчин и для всех.',
    example: 'неважно',
  })
  @IsOptional()
  public gender?: WorkoutGender;

  @ApiProperty({
    description: 'Стоимость тренировки в рублях. Ограничения: целые числа; число больше или равно 0. Значение 0 подразумевает бесплатную тренировку.',
    example: 1000,
  })
  @IsPositive()
  @IsOptional()
  public price?: number;

  @ApiProperty({
    description: 'Минимальное значение 1000, максимально значение 5000; только целые числа.',
    example: 1000,
  })
  @Min(MIN_CALORIES_NUMBER, { message: WORKOUT_CALORIES_NUMBER })
  @Max(MAX_CALORIES_NUMBER, { message: WORKOUT_CALORIES_NUMBER })
  @IsInt()
  @IsOptional()
  public caloriesNumber?: number;

  @ApiProperty({
    description: 'Максимальный размер изображения: 1 мегабайт. Допускаются форматы: jpg, png.',
    example: 'image.png'
  })
  @IsOptional()
  public image?: string;

  @ApiProperty({
    description: 'идео файл с демонстрацией тренировки. Только одно видео; формат видео mov/avi/mp4.',
    example: 'video.avi',
    required: true
  })
  @IsOptional()
  public demonstration?: string;

  @ApiProperty({
    description: 'Флаг готовности пользователя к приглашениям на тренировку.',
    example: true,
    required: true
  })
  @IsBoolean()
  @IsOptional()
  public specialOffer?: boolean; 

  @ApiProperty({
    description: 'Уникальный идентификатор тренера.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3'
  })
  public coachId: string;
}
