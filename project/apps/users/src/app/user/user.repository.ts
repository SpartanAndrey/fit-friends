import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { User } from '@project/shared/app-types';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository implements CRUDRepository<UserEntity, string, User> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {
  }

  public async create(item: UserEntity): Promise<User> {
    const newUser = new this.userModel(item);
    return newUser.save();
  }

  public async destroy(_id: string): Promise<void> {
    this.userModel.deleteOne({_id});
  }

  public async findById(_id: string): Promise<User | null> {
    return this.userModel
      .findOne({_id})
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel
      .findOne({email})
      .exec();
  }

  public async update(_id: string, item: UserEntity): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(_id, item.toObject(), {new: true})
      .exec();
  }

  public async find(ids: string[]): Promise<User[] | null> {
    return this.userModel
      .find({ _id: { $in: [...ids]}})
      .exec();
  }
}