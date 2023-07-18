import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, HttpStatus, Param, Post, Req, Patch } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRequestWorkoutDto } from '../dto/create-request-workout.dto';
import { UpdateRequestWorkoutDto } from '../dto/update-request-workout.dto';
import { ApplicationServiceURL } from '../app.config';

@ApiTags('requests')
@Controller('requests')
export class RequestsController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new request for workout has been successfully created.'
  })
  @Post('create')
  public async create(@Req() req, @Body() dto: CreateRequestWorkoutDto) {
    
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Requests}/create`, dto, {
        headers: {
          'Authorization': req.headers['authorization']
        }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The request for workout has been successfully updated.'
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Req() req, @Body() dto: UpdateRequestWorkoutDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Requests}/${id}`, dto, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });
      return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The request found.'
  })
  @Get(':id')
  async getRequest(@Req() req: Request, @Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Requests}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }
}

