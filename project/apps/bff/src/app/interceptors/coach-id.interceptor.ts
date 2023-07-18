import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common';
import { UserRole } from '@project/shared/app-types';
import { WORKOUT_USER_NOT_COACH } from '../bff.constant';

@Injectable()
export class CoachIdInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    if (request.user.role !== UserRole.Coach) {
      throw new ForbiddenException(WORKOUT_USER_NOT_COACH);
    }
    
    request.body['coachId'] = request.user.sub;
    
    return next.handle();   
  }
}
