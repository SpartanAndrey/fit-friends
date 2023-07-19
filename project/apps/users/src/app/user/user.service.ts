import { ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { AUTH_USER_FRIENDS_EMPTY, AUTH_USER_NOT_FOUND, AUTH_USER_WRONG_ROLE, NOTIFICATION_NOT_FOUND, WORKOUT_NOT_FOUND } from '../users.constant';
import { UpdateUserCoachDto } from '../authentication/dto/update-user-coach.dto';
import { UpdateUserSimpleDto } from '../authentication/dto/update-user-simple.dto';
import { UserEntity } from './user.entity';
import { UserQuery } from './query/user.query';
import { Notification, UserGender, UserRole } from '@project/shared/app-types';
import { ChangeFriendDto } from '../authentication/dto/change-friend.dto';
import { UpdateBalanceDto } from '../authentication/dto/update-balance.dto';
import { DeleteNotificationDto } from '../authentication/dto/delete-notification.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    ) {}
    
  async getUser(id: string) {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async update(id: string, dto: UpdateUserCoachDto | UpdateUserSimpleDto) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new UserEntity({...existUser, ...dto});
    return await this.userRepository.update(id, userEntity);
  }

  async getUsers(query: UserQuery){
    return this.userRepository.find(query);
  }

  async getFriends(id: string, query: UserQuery) {
    const existUser = await this.userRepository.findById(id);
    const { friends } = existUser;

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (friends.length === 0) {
      throw new NotFoundException(AUTH_USER_FRIENDS_EMPTY);
    }

    return this.userRepository.findFriends(friends, query);
  }

  public async getUsersList(ids: string[]) {
    return this.userRepository.findUsers(ids);
  }

  async addFriend(id: string, { friendId }: ChangeFriendDto) {
    const existUser = await this.userRepository.findById(id);
    const { role, name, gender } = existUser;
    const possibleFriend = await this.userRepository.findById(friendId);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!possibleFriend) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (role !== UserRole.User) {
      throw new ForbiddenException(AUTH_USER_WRONG_ROLE);
    }

    existUser.friends.push(friendId);

    const notification: Notification = {
      text: `${name} ${(gender === UserGender.Female) ? 'добавила' : 'добавил'} Вас в друзья`,
      date: new Date(),
    };

    possibleFriend.friends.push(existUser._id.toString());
    possibleFriend.notifications.push(notification);

    const userEntity = new UserEntity(existUser);
    const possibleFriendEntity = new UserEntity(possibleFriend);

    await this.userRepository.update(existUser._id, userEntity);
    await this.userRepository.update(possibleFriend._id, possibleFriendEntity);
    
    return existUser;
  }

  async deleteFriend(id: string, { friendId }: ChangeFriendDto) {
    const existUser = await this.userRepository.findById(id);
    const { friends, role } = existUser;
    const possibleFriend = await this.userRepository.findById(friendId);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!possibleFriend) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (role !== UserRole.User) {
      throw new ForbiddenException(AUTH_USER_WRONG_ROLE);
    }

    const friendIndex = friends.indexOf(friendId);
    const possibleFriendIndex = possibleFriend.friends.indexOf(existUser._id);

    if(friendIndex === -1) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    } else {
      friends.splice(friendIndex, 1);
      possibleFriend.friends.splice(possibleFriendIndex, 1);
    }

    if(possibleFriendIndex === -1) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    } else {
      possibleFriend.friends.splice(possibleFriendIndex, 1);
    }

    const userEntity = new UserEntity(existUser);
    const possibleFriendEntity = new UserEntity(possibleFriend);

    await this.userRepository.update(existUser._id, userEntity);
    await this.userRepository.update(possibleFriend._id, possibleFriendEntity);
    
    return existUser;
  }

  async increaseBalance (id: string, { workoutId, workoutNumber }: UpdateBalanceDto) {
    const existUser = await this.userRepository.findById(id);
    const { role, balance } = existUser;
    
    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (role !== UserRole.User) {
      throw new ForbiddenException(AUTH_USER_WRONG_ROLE);
    }

    const workoutIndex = balance.workouts.findIndex((workout) => workout.id === workoutId);

    if (workoutIndex !== -1) {
      balance.workouts[workoutIndex].quantity += workoutNumber;
    } else {
      balance.workouts.push({ id: workoutId, quantity: workoutNumber });
    }

    balance.totalWorkoutQuantity += workoutNumber;

    const userEntity = new UserEntity(existUser);

    await this.userRepository.update(existUser._id, userEntity);

    return existUser;
  }

  async decreaseBalance (id: string, { workoutId }: UpdateBalanceDto) {
    const existUser = await this.userRepository.findById(id);
    const { role, balance } = existUser;
    
    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (role !== UserRole.User) {
      throw new ForbiddenException(AUTH_USER_WRONG_ROLE);
    }

    const workoutIndex = balance.workouts.findIndex((workout) => workout.id === workoutId);

    if (workoutIndex === -1) {
      throw new NotFoundException(WORKOUT_NOT_FOUND)
    }

    balance.workouts[workoutIndex].quantity--;
    balance.totalWorkoutQuantity--;

    if (balance.workouts[workoutIndex].quantity === 0) {
      balance.workouts.splice(workoutIndex, 1)
    }

    const userEntity = new UserEntity(existUser);

    await this.userRepository.update(existUser._id, userEntity);

    return existUser;
  }

  async deleteNotification(id: string, { notificationText }: DeleteNotificationDto) {
    const existUser = await this.userRepository.findById(id);
   
    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const index = existUser.notifications.findIndex((el) => el.text === notificationText)

    if (index === -1) {
      throw new NotFoundException(NOTIFICATION_NOT_FOUND)
    }

    existUser.notifications.splice(index, 1);

    const userEntity = new UserEntity(existUser);

    await this.userRepository.update(existUser._id, userEntity);
    
    return existUser;
  }

  async deleteNotifications(id: string) {
    const existUser = await this.userRepository.findById(id);
   
    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    existUser.notifications = [];

    const userEntity = new UserEntity(existUser);

    await this.userRepository.update(existUser._id, userEntity);
    
    return existUser;
  }
}
