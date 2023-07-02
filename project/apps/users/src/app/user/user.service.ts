import { Injectable, NotFoundException} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { AUTH_USER_NOT_FOUND } from '../users.constant';
import { UpdateUserCoachDto } from '../authentication/dto/update-user-coach.dto';
import { UpdateUserSimpleDto } from '../authentication/dto/update-user-simple.dto';
import { UserEntity } from './user.entity';
import { UserQuery } from './query/user.query';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    ) {}
    
  public async getUser(id: string) {
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

  public async getUsers(query: UserQuery){
    return this.userRepository.find(query);
  }
}
