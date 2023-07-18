import { Body, Controller, Post, Get, Req, UseFilters, HttpStatus, Param, Patch, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { Request } from 'express';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserCoachDto } from '../dto/create-user-coach.dto';
import { CreateUserSimpleDto } from '../dto/create-user-simple.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserCoachRdo } from '../rdo/user-coach.rdo';
import { UserSimpleRdo } from '../rdo/user-simple.rdo';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { UserQuery } from '../query/user.query';
import { UpdateUserCoachDto } from '../dto/update-user-coach.dto';
import { UpdateUserSimpleDto } from '../dto/update-user-simple.dto';
import { ChangeFriendDto } from '../dto/change-friend.dto';
import { UpdateBalanceDto } from '../dto/update-balance.dto';
import { DeleteNotificationDto } from '../dto/delete-notification.dto';

@ApiTags('users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    type: UserCoachRdo || UserSimpleRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The user has already existed.'
  })
  @Post('register')
  public async create(@Body() createUserDto: CreateUserCoachDto | CreateUserSimpleDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, createUserDto);
    return data;
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found.'
  })
  @Get(':id')
  public async show(@Req() req: Request, @Param('id') id: string) {
    
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found.'
  })
  @Get('/')
  public async index(@Req() req: Request, @Query() query: UserQuery) {
    
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/`, {
      params: query,
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully updated.'
  })
  @Patch(':id')
  public async update(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdateUserCoachDto | UpdateUserSimpleDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/${id}`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User\'s friends found.'
  })
  @Get(':id/friends')
  public async indexFriends(@Req() req: Request, @Param('id') id: string, @Query() query: UserQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}/friends`, {
      params: query,
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Friend has been successfully added.'
  })
  @Patch(':id/friends/add')
  public async addFriend(@Req() req: Request, @Param('id') id: string, @Body() dto: ChangeFriendDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/${id}/friends/add`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Friend has been successfully added.'
  })
  @Patch(':id/friends/remove')
  public async removeFriend(@Req() req: Request, @Param('id') id: string, @Body() dto: ChangeFriendDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/${id}/friends/remove`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User balance has been successfully updated.'
  })
  @Patch(':id/balance/add')
  public async incBalance(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdateBalanceDto) {

    const { workoutId } = dto;

    await this.httpService.axiosRef.get(`${ApplicationServiceURL.Workouts}/${workoutId}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/${id}/balance/add`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User balance has been successfully updated.'
  })
  @Patch(':id/balance/sub')
  public async decBalance(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdateBalanceDto) {

    const { workoutId } = dto;

    await this.httpService.axiosRef.get(`${ApplicationServiceURL.Workouts}/${workoutId}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/${id}/balance/sub`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Notification has been successfully deleted.'
  })
  @Patch(':id/notification')
  public async removeNotification(@Req() req: Request, @Param('id') id: string, @Body() dto: DeleteNotificationDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/${id}`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }
}