import { User, UserGender, UserLevel, UserLocation, UserRole, WorkoutTime, WorkoutType, UserBalance, Notification } from '@project/shared/app-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from '../users.constant';

export class UserEntity implements User {
  public _id?: string;
  public name: string;
  public email: string;
  public avatar?: string;
  public passwordHash: string;
  public gender: UserGender;
  public dateBirth?: Date;
  public role: UserRole;
  public description?: string;
  public location: UserLocation;
  public image?: string;
  public level?: UserLevel;
  public workoutType?: WorkoutType[];
  public certificate?: string[];
  public coachInfo?: string;
  public isReadyToCoach?: boolean;
  public workoutTime?: WorkoutTime;
  public caloriesToBurnNumber?: number;
  public caloriesToSpendNumber?: number;
  public isReadyToTrain?: boolean;
  public friends?: string[];
  public balance?: UserBalance;
  public notifications?: Notification[];

  constructor(user: User) {
    this.fillEntity(user);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(user: User) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.avatar = user.avatar;
    this.passwordHash = user.passwordHash;
    this.gender = user.gender;
    this.dateBirth = user.dateBirth;
    this.role = user.role;
    this.description = user.description;
    this.location= user.location;
    this.image= user.image;
    this.level= user.level;
    this.workoutType= user.workoutType;
    this.certificate= user.certificate;
    this.coachInfo= user.coachInfo;
    this.isReadyToCoach= user.isReadyToCoach;
    this.workoutTime= user.workoutTime;
    this.caloriesToBurnNumber= user.caloriesToBurnNumber;
    this.caloriesToSpendNumber= user.caloriesToSpendNumber;
    this.isReadyToTrain= user.isReadyToTrain;
    this.friends = user.friends;
    this.balance = user.balance;
    this.notifications = user.notifications;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}