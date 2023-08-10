import { Workout } from '../../types/workout';
import CarouselSlider from '../carousel-slider/carousel-slider';
import PopularWorkoutSlide from './popular-workout-slide';

type Props = {
  workouts: Workout[];
  currentCard: number;
  visibleCards: number;
}

function PopularWorkoutSlider({currentCard, workouts, visibleCards}: Props): JSX.Element {
  return(
    <CarouselSlider
    naturalSlideHeight={1}
    naturalSlideWidth={1}
    currentSlide={currentCard}
    visibleSlides={visibleCards}
    slides={workouts.map((workout: Workout) => <PopularWorkoutSlide key={workout.id} workout={workout} />)}
    />
  )
}

export default PopularWorkoutSlider;
