import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

type CarouselSliderProps = {
  slides: JSX.Element[];
  currentSlide: number;
  visibleSlides: number;
  naturalSlideWidth: number;
  naturalSlideHeight: number;
  isIntrinsicHeight?: boolean;
}

function CarouselSlider({slides, currentSlide, visibleSlides, naturalSlideHeight, naturalSlideWidth, isIntrinsicHeight}: CarouselSliderProps): JSX.Element {
  return (
    <CarouselProvider
      naturalSlideWidth={naturalSlideWidth}
      naturalSlideHeight={naturalSlideHeight}
      totalSlides={slides.length}
      visibleSlides={visibleSlides}
      currentSlide={currentSlide}
      isIntrinsicHeight={isIntrinsicHeight}
    >     
      <Slider>
        {slides.map((slide, index) => (
          <Slide key={index} index={index}>{slide}</Slide>
        ))}
      </Slider>
    </CarouselProvider>
  );
}

export default CarouselSlider;
