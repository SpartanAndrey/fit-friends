import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './user.model';
import { UserRepository } from './user.repository';
import { UserCoachSchema } from './user-coach.model';
import { UserSimpleSchema } from './user-simple.model';
import { UserRole } from '@project/shared/app-types';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([
    { 
      name: UserModel.name, 
      schema: UserSchema,
      discriminators: [
        { name: UserRole.Coach, schema: UserCoachSchema},
        { name: UserRole.User, schema: UserSimpleSchema},
      ],
    }
  ])],
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService]
})
export class UserModule {}