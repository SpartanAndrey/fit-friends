import { ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { AUTH_USER_FRIENDS_EMPTY, AUTH_USER_NOT_FOUND, AUTH_USER_WRONG_ROLE } from '../users.constant';
import { UpdateUserCoachDto } from '../authentication/dto/update-user-coach.dto';
import { UpdateUserSimpleDto } from '../authentication/dto/update-user-simple.dto';
import { UserEntity } from './user.entity';
import { UserQuery } from './query/user.query';
import { UserRole } from '@project/shared/app-types';
import { ChangeFriendDto } from '../authentication/dto/change-friend.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    ) {}
    
  async getUser(id: string) {
    return this.userRepository.findById(id);
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

  async addFriend(id: string, { friendId }: ChangeFriendDto) {
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

    friends.push(friendId);
    possibleFriend.friends.push(existUser._id.toString());

    const userEntity = new UserEntity(existUser);
    const possibleFriendEntity = new UserEntity(possibleFriend);

    await this.userRepository.update(existUser._id, userEntity);
    await this.userRepository.update(possibleFriend._id, possibleFriendEntity);
    
    return existUser;

    // сюда надо добавить оповещение
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
}
