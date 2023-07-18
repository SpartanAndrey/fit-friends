import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { RequestsController } from './requests/requests.controller';
import { WorkoutsController } from './workouts/workouts.controller';
import { OrdersController } from './orders/orders.controller';
import { ReviewsController } from './reviews/reviews.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
  ],
  controllers: [
    UsersController,
    RequestsController,
    WorkoutsController,
    OrdersController,
    ReviewsController,
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
