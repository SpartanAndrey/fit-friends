import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3'
  })
  @Transform(({ obj }) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'Электронная почта.',
    example: 'user@gmail.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Токен доступа.',
    example: '...'
  })
  @Expose()
  public accessToken: string;
}
