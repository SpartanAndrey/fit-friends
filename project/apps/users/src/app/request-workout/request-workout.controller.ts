import { Body, Controller, Get, HttpStatus, Param, Post, Req, UseGuards, Patch } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { RequestWorkoutService } from './request-workout.service';
import { RequestWorkoutRdo } from './rdo/request-workout.rdo';
import { CreateRequestWorkoutDto } from './dto/create-request-workout.dto';
import { UpdateRequestWorkoutDto } from './dto/update-request-workout.dto';

@ApiTags('requests')
@Controller('requests')
export class RequestWorkoutController {
  constructor(
    private readonly requestService: RequestWorkoutService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: RequestWorkoutRdo,
    status: HttpStatus.CREATED,
    description: 'The new request for workout has been successfully created.'
  })
  @Post('create')
  public async create(@Req() req, @Body() dto: CreateRequestWorkoutDto) {
    const newRequest = await this.requestService.create(req.user.email, dto);
     
    return fillObject(RequestWorkoutRdo, newRequest);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: RequestWorkoutRdo,
    status: HttpStatus.CREATED,
    description: 'The request for workout has been successfully updated.'
  })
  @Patch(':requestId')
  async update(@Param('requestId', MongoidValidationPipe) requestId: string, @Req() req, @Body() dto: UpdateRequestWorkoutDto) {
    const updatedRequest = await this.requestService.update(requestId, req.user.email, dto);

    return fillObject(RequestWorkoutRdo, updatedRequest);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: RequestWorkoutRdo,
    status: HttpStatus.OK,
    description: 'The request found.'
  })
  @Get(':requestId')
  async getRequest(@Param('requestId', MongoidValidationPipe) requestId: string) {
    const existRequest = await this.requestService.getRequest(requestId);

    return fillObject(RequestWorkoutRdo, existRequest);
  }
}
