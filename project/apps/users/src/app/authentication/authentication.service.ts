import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserCoachDto } from './dto/create-user-coach.dto';
import { CreateUserSimpleDto } from './dto/create-user-simple.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { User } from '@project/shared/app-types';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from '@project/config/config-users';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@project/util/util-core';
import dayjs from 'dayjs';
import * as crypto from 'node:crypto';
import { AUTH_USER_EXIST, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from '../users.constant';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject (jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
    ) {}
    
  public async register(dto: CreateUserCoachDto | CreateUserSimpleDto) {
    const {email, password, dateBirth} = dto;
    
    const existUser = await this.userRepository
    .findByEmail(email);
  
    if (existUser) {
      throw new ConflictException(AUTH_USER_EXIST);
    }

    const user = {...dto, dateBirth: dayjs(dateBirth).toDate(), passwordHash: '', friends: []};
    
    const userEntity = await new UserEntity(user)
      .setPassword(password)
    
    return this.userRepository
      .create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existUser);
    if (!await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return userEntity.toObject();
  }


  public async createUserToken(user: User) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })
    }
  }

}

