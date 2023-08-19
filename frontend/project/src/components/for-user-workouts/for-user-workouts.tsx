import { useState } from 'react';
import { Workout } from '../../types/workout';
import ForUserWorkoutSlider from './for-user-workout-slider';

type Props = {
  workouts: Workout[];
}

const DEFAULT_VISIBLE_SLIDES = 3;

function ForUserWorkouts({workouts}: Props): JSX.Element {

  const [currentCard, setCurrentCard] = useState(0);

  const buttonBackClickHandle = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const buttonNextClickHandle = () => {
    if (currentCard < workouts.length - DEFAULT_VISIBLE_SLIDES) {
      setCurrentCard(currentCard + 1);
    }
  };

  return(
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">Специально подобрано для вас</h2>
            <div className="special-for-you__controls">
              <button onClick={buttonBackClickHandle} className="btn-icon special-for-you__control" type="button" aria-label="previous">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button onClick={buttonNextClickHandle} className="btn-icon special-for-you__control" type="button" aria-label="next">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="special-for-you__list">
            {workouts.length > 0
              ? <ForUserWorkoutSlider currentCard={currentCard} workouts={workouts} visibleCards={DEFAULT_VISIBLE_SLIDES} />
              : <div>Скоро и для Вас тренировки найдутся</div> }
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ForUserWorkouts;
