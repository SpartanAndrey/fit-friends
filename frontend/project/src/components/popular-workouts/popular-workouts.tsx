import { useState } from 'react';
import { Workout } from '../../types/workout';
import PopularWorkoutSlider from './popular-workout-slider';
import { useAppDispatch } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { AppRoute } from '../../constant';

type Props = {
  workouts: Workout[];
}

const DEFAULT_VISIBLE_SLIDES = 4;

function PopularWorkouts({workouts}: Props): JSX.Element {

  const dispatch = useAppDispatch();
  
  const [currentCard, setCurrentCard] = useState(0);

  const buttonBackClickHandle = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  }

  const buttonNextClickHandle = () => {
    if (currentCard < workouts.length - DEFAULT_VISIBLE_SLIDES) {
      setCurrentCard(currentCard + 1);
    }
  }

  const buttonViewAllHandle = () => {
    dispatch(redirectToRoute(AppRoute.WorkoutsCatalog));
  }
  
  return(
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button onClick={buttonViewAllHandle} className="btn-flat popular-trainings__button" type="button"><span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <button onClick={buttonBackClickHandle} className="btn-icon popular-trainings__control" type="button" aria-label="previous">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button onClick={buttonNextClickHandle} className="btn-icon popular-trainings__control" type="button" aria-label="next">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="popular-trainings__list">
            <PopularWorkoutSlider currentCard={currentCard} workouts={workouts} visibleCards={DEFAULT_VISIBLE_SLIDES} />
          </ul>
        </div>
      </div>
    </section>
  )
}

export default PopularWorkouts;
