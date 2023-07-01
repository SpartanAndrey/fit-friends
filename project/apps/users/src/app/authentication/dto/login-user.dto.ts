import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { AUTH_USER_EMAIL_NOT_VALID } from '../../users.constant';

export class LoginUserDto {
  @ApiProperty({
    description: 'Используется в качестве имени пользователя (логин). Адрес уникален: в базе данных не может быть двух пользователей с одинаковым email.',
    example: 'user@gmail.com'
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'Пароль пользователя. Минимальная длина пароля 6 символов, максимальная 12.',
    example: '123456'
  })
  @IsString()
  public password: string;
}
