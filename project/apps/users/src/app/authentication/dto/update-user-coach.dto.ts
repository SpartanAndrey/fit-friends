import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsString, Length, IsOptional, ArrayMaxSize, IsBoolean } from 'class-validator';
import { UserGender, UserLevel, UserLocation, WorkoutType } from '@project/shared/app-types';
import { MIN_NAME_LENGTH, MAX_NAME_LENGTH, MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH, AUTH_USER_NAME_LENGTH, AUTH_DESCRIPTION_LENGTH, AUTH_USER_DATEBIRTH_NOT_VALID, MAX_WORKOUT_TYPE_NUMBER, AUTH_WORKOUT_TYPE_NUMBER, AUTH_COACH_INFO_LENGTH } from '../../users.constant';

export class UpdateUserCoachDto {
  @ApiProperty({
    description: 'Имя пользователя. Минимальная длина поля: 1 символ, максимальная 15 символов.',
    example: 'Ivan ',
  })
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH, { message: AUTH_USER_NAME_LENGTH })
  @IsString()
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: 'Одно из трёх значений: женский, мужской и неважно.',
    example: 'неважно',
  })
  @IsOptional()
  public gender?: UserGender;

  @ApiProperty({
    description: 'Текст с общей информацией. Минимальная длина 10 символов. Максимальная длина: 140 символов',
    example: 'Я очень хороший тренер, правда-правда.'
  })
  @IsOptional()
  @Length(MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH, { message: AUTH_DESCRIPTION_LENGTH })
  @IsString()
  public description?: string;

  @ApiProperty({
    description: 'Станция метро. Одна из станций: «Пионерская», «Петроградская», «Удельная», «Звёздная», «Спортивная».',
    example: 'Udelnaya',
  })
  @IsOptional()
  public location?: UserLocation;

  @ApiProperty({
    description: 'Дата рождения пользователя в формате: YYYY-MM-DD. Дата рождения включает день, месяц и год.',
    example: '2022-02-22',
  })
  @IsISO8601({}, { message: AUTH_USER_DATEBIRTH_NOT_VALID })
  @IsOptional()
  public dateBirth?: Date;

  @ApiProperty({
    description: 'Аватарка пользователя. Ограничения: не больше 1 мегабайта, формат jpeg или png.',
    example: 'avatar.png'
  })
  @IsOptional()
  public avatar?: string;

  @ApiProperty({
    description: 'Изображение для страницы. Формат jpeg или png.',
    example: 'image.png',
  })
  @IsOptional()
  public image?: string;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя. Допустимые значения: новичок, любитель, профессионал.',
    example: 'новичок',
  })
  @IsOptional()
  public level: UserLevel;

  @ApiProperty({
    description: 'Допустимые значения: йога, бег, бокс, стрейчинг, кроссфит, аэробика, пилатес; одновременно может быть выбрано не больше трёх значений.',
    example: 'новичок',
  })
  @ArrayMaxSize(MAX_WORKOUT_TYPE_NUMBER, {message: AUTH_WORKOUT_TYPE_NUMBER})
  @IsOptional()
  public workoutType: WorkoutType[];

  @ApiProperty({
    description: 'Сертификат тренера, pdf-файл. ',
    example: 'sertificate.pdf',
  })
  @IsOptional()
  public certificate?: string[];

  @ApiProperty({
    description: ' Текст с описанием заслуг тренера. Максимальная длина: 140 символов',
    example: 'Умею прыгать, умею приседать.'
  })
  @IsOptional()
  @Length(MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH, { message: AUTH_COACH_INFO_LENGTH })
  @IsString()
  public coachInfo?: string;

  @ApiProperty({
    description: 'Флаг готовности проводить индивидуальные тренировки.',
    example: 'true'
  })
  @IsBoolean()
  @IsOptional()
  public isReadyToCoach?: boolean; 
}
