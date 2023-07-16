import { Module } from '@nestjs/common';
import { WorkoutModule } from './workout/workout.module';
import { PrismaModule } from './prisma/prisma.module';
import { WorkoutController } from './workout/workout.controller';
import { WorkoutService } from './workout/workout.service';
import { WorkoutRepository } from './workout/workout.repository';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    WorkoutModule,
    PrismaModule,
    OrderModule,
    ReviewModule,
  ],
  controllers: [WorkoutController],
  providers: [WorkoutService, WorkoutRepository],
  exports: [WorkoutRepository],
})
export class AppModule {}
