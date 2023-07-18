import {ApplicationServiceURL} from '../app.config';
import {WorkoutRdo} from '../rdo/workout.rdo';
import { HttpService } from '@nestjs/axios';


export async function fillWorkoutData(workouts: WorkoutRdo[], httpService: HttpService) {
    const coachIds = workouts.map((workout) => workout.coachId);

    const users = (await httpService.axiosRef.post(`${ApplicationServiceURL.Users}/users-list`, { ids: coachIds })).data;
    
    const filledWorkouts = workouts.map((workout) => {
      const coach = users.find(({id}) => id === workout.coachId);
    
      delete workout.coachId;

      return { ...workout, coach: coach };
    })

    return filledWorkouts;
}
