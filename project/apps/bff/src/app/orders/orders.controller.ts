import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { CoachIdInterceptor } from '../interceptors/coach-id.interceptor';
import { ApplicationServiceURL } from '../app.config';
import { OrderRdo } from '../rdo/order.rdo';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderQuery } from '../query/order.query';
import { CheckCoachInterceptor } from '../interceptors/check-coach.interceptor';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.CREATED,
    description: 'The new order has been successfully created.'
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CoachIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreateOrderDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Orders}/`, dto);
    return data;
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: 'The coach\'s orders are provided.'
  })
  @Get('/coach/:coachId')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CheckCoachInterceptor)
  async indexCoach(@Param('coachId') coachId: string, @Query() query: OrderQuery) {

    const { data } = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Orders}/coach/${coachId}`, { params: query })).data;
    
    return data;
  }

}
