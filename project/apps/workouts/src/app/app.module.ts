import { Module } from '@nestjs/common';
import { WorkoutModule } from './workout/workout.module';
import { PrismaModule } from './prisma/prisma.module';
import { WorkoutController } from './workout/workout.controller';
import { WorkoutService } from './workout/workout.service';
import { WorkoutRepository } from './workout/workout.repository';

@Module({
  imports: [WorkoutModule, PrismaModule],
  controllers: [WorkoutController],
  providers: [WorkoutService, WorkoutRepository],
  exports: [WorkoutRepository],
})
export class AppModule {}
