import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common';
import { UserRole } from '@project/shared/app-types';
import { USER_NOT_SIMPLE } from '../bff.constant';

@Injectable()
export class CoachIdInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    if (request.user.role !== UserRole.User) {
      throw new ForbiddenException(USER_NOT_SIMPLE);
    }
    
    request.body['userId'] = request.user.sub;
    
    return next.handle();   
  }
}
