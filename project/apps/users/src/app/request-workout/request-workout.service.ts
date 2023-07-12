import { UserRole, RequestStatus } from '@project/shared/app-types';
import { RequestWorkoutRdo } from './rdo/request-workout.rdo';
import { UserRdo } from '../authentication/rdo/user.rdo';
import { Injectable, HttpException, HttpStatus, NotFoundException, ForbiddenException} from '@nestjs/common';
import { RequestWorkoutRepository } from './request-workout.repository';
import { RequestWorkoutEntity } from './request-workout.entity';
import { CreateRequestWorkoutDto } from './dto/create-request-workout.dto';
import { AUTH_USER_EXIST, AUTH_USER_NOT_FOUND, AUTH_USER_WRONG_ROLE, REQUEST_WORKOUT_INITIATOR_WRONG, REQUEST_WORKOUT_NOT_FOUND, REQUEST_WORKOUT_UPDATE_WRONG } from '../users.constant';
import { UpdateRequestWorkoutDto } from './dto/update-request-workout.dto';
import { UserService } from '../user/user.service';
import dayjs from 'dayjs';

@Injectable()
export class RequestWorkoutService {
  constructor(
    private readonly requestRepository: RequestWorkoutRepository,
    private readonly userService: UserService,
  ) {}

  async create(initiatorEmail: string, dto: CreateRequestWorkoutDto) {

    const existUser = await this.userService.getUserByEmail(initiatorEmail);

    const { _id, role } = existUser;

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }
  
    if (role !== UserRole.User) {
      throw new ForbiddenException(AUTH_USER_WRONG_ROLE);
    }

    const requestWorkout = {...dto, initiatorId: _id, status: RequestStatus.Pending, updateStatusDate: dayjs().toDate()};

    const requestWorkoutEntity =  new RequestWorkoutEntity(requestWorkout);

    return await this.requestRepository.create(requestWorkoutEntity);
  }
  
  async update(requestId: string, userEmail: string, dto: UpdateRequestWorkoutDto) {

    const existUser = await this.userService.getUserByEmail(userEmail);

    const existRequest = await this.requestRepository.findById(requestId);

    if (!existRequest) {
      throw new NotFoundException(REQUEST_WORKOUT_NOT_FOUND);
    }

    if(existRequest.initiatorId === existUser._id) {
      throw new ForbiddenException(REQUEST_WORKOUT_INITIATOR_WRONG);
    }
    
    if(existRequest.userId !== existUser._id) {
      throw new ForbiddenException(REQUEST_WORKOUT_UPDATE_WRONG);
    }

    if (dto.status === existRequest.status) {
      return existRequest;
    } 

    const requestWorkoutEntity = new RequestWorkoutEntity({...existRequest, ...dto, updateStatusDate: dayjs().toDate()});

    return await this.requestRepository.update(requestId, requestWorkoutEntity);
  }

  async getRequest(id: string) {
    const existRequest = await this.requestRepository.findById(id);

    if (!existRequest) {
      throw new NotFoundException(REQUEST_WORKOUT_NOT_FOUND);
    }

    return existRequest;
  }
}


