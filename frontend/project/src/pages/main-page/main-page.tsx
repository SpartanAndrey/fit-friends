import _ from 'lodash';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getWorkoutCatalogLoadingStatus, getWorkouts } from '../../store/workout-process/workout-selectors';
import { getUserCatalogLoading, getUsers } from '../../store/user-process/user-selectors';
import LoadingSlider from '../../components/loading-slider/loading-slider';
import { getRandomItems } from '../../utils/utils';
import ForUserWorkouts from '../../components/for-user-workouts/for-user-workouts';
import SpecialWorkouts from '../../components/special-workouts/special-workouts';
import PopularWorkouts from '../../components/popular-workouts/popular-workouts';
import LookForCompany from '../../components/look-for-company/look-for-company';


function MainPage() {
  const isUserCatalogLoading = useAppSelector(getUserCatalogLoading);
  const isWorkoutDataLoading = useAppSelector(getWorkoutCatalogLoadingStatus);
  const users = useAppSelector(getUsers);
  const workouts = useAppSelector(getWorkouts);
  
  const forUserWorkouts = getRandomItems(workouts);
  const popularWorkouts = _.sortBy(workouts, 'rating').reverse();
  const specialWorkouts = workouts.filter((el)=>el.specialOffer === true);

  if (isUserCatalogLoading || isWorkoutDataLoading) {
    return (<LoadingSlider />);
  }

  if(!users) {
    return null;
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <ForUserWorkouts workouts={forUserWorkouts}/>
        <SpecialWorkouts workouts={specialWorkouts}/>
        <PopularWorkouts workouts={popularWorkouts}/>
        <LookForCompany users={users}/>
      </main>
    </div>

  );
}

export default MainPage;
