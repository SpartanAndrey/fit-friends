import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { RequestWorkoutEntity } from './request-workout.entity';
import { RequestWorkout } from '@project/shared/app-types';
import { RequestWorkoutModel } from './request-workout.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RequestWorkoutRepository implements CRUDRepository<RequestWorkoutEntity, string, RequestWorkout> {
  constructor(
    @InjectModel(RequestWorkoutModel.name) private readonly requestModel: Model<RequestWorkoutModel>) {
  }

  public async create(item: RequestWorkoutEntity): Promise<RequestWorkout> {
    const newRequestWorkout = new this.requestModel(item);
    return newRequestWorkout.save();
  }

  public async destroy(_id: string): Promise<void> {
    this.requestModel.deleteOne({_id});
  }

  public async findById(_id: string): Promise<RequestWorkout | null> {
    return this.requestModel
      .findOne({_id})
      .exec();
  }

  public async update(_id: string, item: RequestWorkoutEntity): Promise<RequestWorkout> {
    return this.requestModel
      .findByIdAndUpdate(_id, item.toObject(), {new: true})
      .exec();
  }
}