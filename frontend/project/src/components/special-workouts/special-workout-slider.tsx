import { useState } from 'react';
import { Workout } from '../../types/workout';
import CarouselSlider from '../carousel-slider/carousel-slider';
import SpecialWorkoutSlide from './special-workout-slide';

type Props = {
  workouts: Workout[];
}

function SpecialWorkoutSlider({workouts}: Props): JSX.Element {
  
  const [currentSlide, setCurrentSlide] = useState(0);

  const visibleSlides = 1;

  const handleButtonBackClick = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  }

  const handleButtonNextClick = () => {
    if (currentSlide < workouts.length - visibleSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  }


  return(
    <CarouselSlider
      naturalSlideHeight={1000}
      naturalSlideWidth={500}
      currentSlide={currentSlide}
      visibleSlides={visibleSlides}
      slides={workouts.slice(0,3).map((workout: Workout) => <SpecialWorkoutSlide key={workout.id} workout={workout} />)}
    /> 
  )
}

export default SpecialWorkoutSlider;
