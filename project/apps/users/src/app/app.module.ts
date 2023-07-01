import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { ConfigUsersModule, getMongooseOptions, } from '@project/config/config-users';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    RefreshTokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}