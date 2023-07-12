import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateRequestWorkoutDto {
  @ApiProperty()
  @IsString()
  public userId: string;
}
