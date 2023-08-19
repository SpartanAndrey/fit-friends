import { UserFull } from '../../types/user-full';
import CarouselSlider from '../carousel-slider/carousel-slider';
import LookForCompanySlide from './look-for-company-slide';

type Props = {
  users: UserFull[];
  currentCard: number;
  visibleCards: number;
}

function LookForCompanySlider({currentCard, users, visibleCards}: Props): JSX.Element {

  return(
    <CarouselSlider
      naturalSlideHeight={1000}
      naturalSlideWidth={500}
      currentSlide={currentCard}
      visibleSlides={visibleCards}
      slides={users.slice(0,3).map((user: UserFull) => <LookForCompanySlide key={user.id} user={user} />)}
    />
  );
}

export default LookForCompanySlider;
