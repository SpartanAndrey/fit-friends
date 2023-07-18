import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { UserGender, UserLevel, UserLocation, UserRole, WorkoutType } from '@project/shared/app-types';

export class UserCoachRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3'
  })
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;
  
  @ApiProperty({
    description: 'Имя пользователя. Минимальная длина поля: 1 символ, максимальная 15 символов.',
    example: 'Ivan ',
    required: true
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Используется в качестве имени пользователя (логин). Адрес уникален: в базе данных не может быть двух пользователей с одинаковым email.',
    example: 'user@gmail.com',
    required: true
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Одно из трёх значений: женский, мужской и неважно.',
    example: 'неважно',
    required: true
  })
  @Expose()
  public gender: UserGender;

  @ApiProperty({
    description: 'Роль пользователя в системе. Доступные роли: тренер и пользователь.',
    example: 'coach',
    required: true
  })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'Текст с общей информацией. Минимальная длина 10 символов. Максимальная длина: 140 символов',
    example: 'Я очень хороший тренер, правда-правда.'
  })
  @Expose()
  public description?: string;

  @ApiProperty({
    description: 'Станция метро. Одна из станций: «Пионерская», «Петроградская», «Удельная», «Звёздная», «Спортивная».',
    example: 'Udelnaya',
    required: true
  })
  @Expose()
  public location: UserLocation;

  @ApiProperty({
    description: 'Дата рождения пользователя в формате: YYYY-MM-DD. Дата рождения включает день, месяц и год.',
    example: '2022-02-22',
  })
  @Expose()
  public dateBirth?: Date;

  @ApiProperty({
    description: 'Аватарка пользователя. Ограничения: не больше 1 мегабайта, формат jpeg или png.',
    example: 'avatar.png'
  })
  @Expose()
  public avatar?: string;

  @ApiProperty({
    description: 'Изображение для страницы. Формат jpeg или png.',
    example: 'image.png',
  })
  @Expose()
  public image?: string;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя. Допустимые значения: новичок, любитель, профессионал.',
    example: 'новичок',
    required: true
  })
  @Expose()
  public level: UserLevel;

  @ApiProperty({
    description: 'Допустимые значения: йога, бег, бокс, стрейчинг, кроссфит, аэробика, пилатес; одновременно может быть выбрано не больше трёх значений.',
    example: 'новичок',
    required: true
  })
  @Expose()
  public workoutType: WorkoutType[];

  @ApiProperty({
    description: 'Сертификат тренера, pdf-файл. ',
    example: 'sertificate.pdf',
  })
  @Expose()
  public certificate?: string;

  @ApiProperty({
    description: ' Текст с описанием заслуг тренера. Максимальная длина: 140 символов',
    example: 'Умею прыгать, умею приседать.'
  })
  @Expose()
  public coachInfo?: string;

  @ApiProperty({
    description: 'Флаг готовности проводить индивидуальные тренировки.',
    example: 'true'
  })
  @Expose()
  public isReadyToCoach?: boolean; 
}
