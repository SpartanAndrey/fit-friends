import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';
import { RequestStatus } from '@project/shared/app-types';

export class UpdateRequestWorkoutDto {
  @ApiProperty()
  @IsString()
  public status: RequestStatus;
}
