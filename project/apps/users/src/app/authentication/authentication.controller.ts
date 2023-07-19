import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards, Patch, Query, Delete} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserCoachDto } from './dto/create-user-coach.dto';
import { CreateUserSimpleDto } from './dto/create-user-simple.dto';
import { UpdateUserCoachDto } from './dto/update-user-coach.dto';
import { UpdateUserSimpleDto } from './dto/update-user-simple.dto';
import { fillObject } from '@project/util/util-core';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { UserCoachRdo } from './rdo/user-coach.rdo';
import { UserSimpleRdo } from './rdo/user-simple.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RequestWithUser, RequestWithTokenPayload } from '@project/shared/app-types';
import { UserRole } from '@project/shared/app-types';
import { UserService } from '../user/user.service';
import { UserQuery } from '../user/query/user.query';
import { ChangeFriendDto } from './dto/change-friend.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { DeleteNotificationDto } from './dto/delete-notification.dto';

@ApiTags('users')
@Controller('users')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly userService: UserService,
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
  public async create(@Body() dto: CreateUserCoachDto | CreateUserSimpleDto) {
    const newUser = await this.authService.register(dto);
    const { role } = newUser;
    
    if (role === UserRole.Coach) {
      return fillObject(UserCoachRdo, newUser);
    } 
    return fillObject(UserSimpleRdo, newUser);
  }

  @UseGuards(LocalAuthGuard)
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
  @HttpCode(HttpStatus.OK)
  public async login(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found.'
  })
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.userService.getUser(id);

    return fillObject(UserRdo, existUser);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'The users are provided.'
  })
  @Get('/')
  public async index(@Query() query: UserQuery) {
    const users = await this.userService.getUsers(query);

    return fillObject(UserRdo, users);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: UserCoachRdo || UserSimpleRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully updated.'
  })
  async update(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UpdateUserCoachDto | UpdateUserSimpleDto) {
    
    const updatedUser = await this.userService.update(id, dto);
    
    const { role } = updatedUser;
    
    if (role === UserRole.Coach) {
      return fillObject(UserCoachRdo, updatedUser);
    } 
    return fillObject(UserSimpleRdo,updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @Post('/users-list')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The users list has been successfully added.'
  })
  async getUsers(@Body() data: {ids: string[]}) {
    
    const users = await this.userService.getUsersList(data.ids);

    return fillObject(UserRdo, users);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User\'s friends found.'
  })
  @Get(':id/friends')
  public async indexFriends(@Param('id', MongoidValidationPipe) id: string, @Query() query: UserQuery) {
    const users = await this.userService.getFriends(id, query);

    return fillObject(UserRdo, users);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'Friend has been successfully added.'
  })
  @Patch(':id/friends/add')
  async addFriend(@Param('id', MongoidValidationPipe) id: string, @Body() dto: ChangeFriendDto) {
    const updatedUser = await this.userService.addFriend(id, dto);
    return fillObject(UserRdo, updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'Friend has been successfully added.'
  })
  @Patch(':id/friends/remove')
  async removeFriend(@Param('id', MongoidValidationPipe) id: string, @Body() dto: ChangeFriendDto) {
    const updatedUser = await this.userService.deleteFriend(id, dto);
    return fillObject(UserRdo, updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'User balance has been successfully updated.'
  })
  @Patch('/:id/balance/add')
  async incBalance(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UpdateBalanceDto) {
    const updatedUser = await this.userService.increaseBalance(id, dto);
    return fillObject(UserRdo, updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'User balance has been successfully updated.'
  })
  @Patch('/:id/balance/sub')
  async decBalance(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UpdateBalanceDto) {
    const updatedUser = await this.userService.decreaseBalance(id, dto);
    return fillObject(UserRdo, updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Notification has been successfully deleted.'
  })
  @Patch('/:id/notification')
  async removeNotification(@Param('id', MongoidValidationPipe) id: string, @Body() dto: DeleteNotificationDto) {
    const updatedUser = await this.userService.deleteNotification(id, dto);
    return fillObject(UserRdo, updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Notifications has been successfully deleted.'
  })
  @Delete('/:id/notifications')
  async removeNotifications(@Param('id', MongoidValidationPipe) id: string) {
    const updatedUser = await this.userService.deleteNotifications(id);
    return fillObject(UserRdo, updatedUser);
  }
}
