import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards, Patch, Query} from '@nestjs/common';
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

@ApiTags('authentication')
@Controller('auth')
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
}
