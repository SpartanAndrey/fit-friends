import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserGender, UserLocation, UserRole } from '@project/shared/app-types';

@Schema({
    collection: 'users',
    timestamps: true,
    discriminatorKey: 'role',
  })

export class UserModel extends Document implements User {
  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: true,
  })
  public email: string;

  @Prop()
  public avatar?: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserGender,
    default: UserGender.NoMatter,
  })
  public gender: UserGender;

  @Prop({
    required: true,
  })
  public dateBirth: Date;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.Coach,
  })
  public role: UserRole;

  @Prop()
  public description?: string;

  @Prop({
    required: true,
    type: String,
    enum: UserLocation,
    default: UserLocation.Udelnaya,
  })
  public location: UserLocation;

  @Prop()
  public image?: string;

}

export const UserSchema = SchemaFactory.createForClass(UserModel);
