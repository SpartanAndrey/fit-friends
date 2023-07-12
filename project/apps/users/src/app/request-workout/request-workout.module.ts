import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestWorkoutModel, RequestWorkoutSchema } from './request-workout.model';
import { RequestWorkoutRepository } from './request-workout.repository';
import { RequestWorkoutService } from './request-workout.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/config/config-users';
import { JwtAccessStrategy } from '../authentication/strategies/jwt-access.strategy';
import { UserModule } from '../user/user.module';
import { RequestWorkoutController } from './request-workout.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RequestWorkoutModel.name, schema: RequestWorkoutSchema },
    ]),
    RequestWorkoutModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [RequestWorkoutController],
  providers: [
    RequestWorkoutRepository,
    RequestWorkoutService,
    JwtAccessStrategy,
  ],
  exports: [RequestWorkoutRepository, RequestWorkoutService],
})
export class RequestWorkoutModule {}
