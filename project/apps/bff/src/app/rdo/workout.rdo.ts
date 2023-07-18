import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserLevel, WorkoutGender, WorkoutTime, WorkoutType } from '@project/shared/app-types';

export class WorkoutRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор тренировки.',
    example: 300
  })
  @Expose({ name: 'workoutId'})
  public id: number;

  @ApiProperty({
    description: 'Название тренировки. Минимальная длина 1 символ, максимальная длина 15 символов.',
    example: 'Лучшая треня',
    required: true
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Фоновая картинка для карточки тренировки. Изображение в формате jpg/png.',
    example: 'image.png',
    required: true
  })
  @Expose()
  public backgroundImage: string;

  @ApiProperty({
    description: 'Описание тренировки. Минимальная длина 10 символов; максимальная длина 140 символов.',
    example: 'Добавить нечего, просто лучшая.',
    required: true
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя. Допустимые значения: новичок, любитель, профессионал.',
    example: 'новичок',
    required: true
  })
  @Expose()
  public level: UserLevel;

  @ApiProperty({
    description: 'Одно значение из списка: йога, бег, бокс, стрейчинг, кроссфит, аэробика, пилатес.',
    example: 'новичок',
    required: true
  })
  @Expose()
  public workoutType: WorkoutType;

  @ApiProperty({
    description: 'Время на тренировку указывается в предопределённых интервалах. Один из вариантов: 10-30 мин, `30-50 мин, 50-80 мин, 80-100 мин.',
    example: '10-30 мин',
    required: true
  })
  @Expose()
  public workoutTime: WorkoutTime;

  @ApiProperty({
    description: 'Одно из трёх значений: для женщин, для мужчин и для всех.',
    example: 'неважно',
    required: true
  })
  @Expose()
  public gender: WorkoutGender;

  @ApiProperty({
    description: 'Стоимость тренировки в рублях. Ограничения: целые числа; число больше или равно 0. Значение 0 подразумевает бесплатную тренировку.',
    example: 1000,
    required: true
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Минимальное значение 1000, максимально значение 5000; только целые числа.',
    example: 1000,
    required: true
  })
  @Expose()
  public caloriesNumber: number;

  @ApiProperty({
    description: 'Максимальный размер изображения: 1 мегабайт. Допускаются форматы: jpg, png.',
    example: 'image.png'
  })
  @Expose()
  public image?: string;

  @ApiProperty({
    description: 'идео файл с демонстрацией тренировки. Только одно видео; формат видео mov/avi/mp4.',
    example: 'video.avi',
    required: true
  })
  @Expose()
  public demonstration?: string;

  @ApiProperty({
    description: 'Уникальный идентификатор тренера.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3'
  })
  @Expose()
  public coachId: string;

  @ApiProperty({
    description: 'Флаг готовности пользователя к приглашениям на тренировку.',
    example: true,
    required: true
  })
  @Expose()
  public isReadyToTrain: boolean; 
}
