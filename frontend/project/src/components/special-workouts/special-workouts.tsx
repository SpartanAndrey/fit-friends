import { Workout } from '../../types/workout';
import SpecialWorkoutSlider from './special-workout-slider';

type Props = {
  workouts: Workout[];
}

function SpecialWorkouts({workouts}: Props): JSX.Element {
  
  return(
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>

          <ul className="special-offers__list">
            <SpecialWorkoutSlider workouts={workouts}/>
          </ul>          
          
          <div className="thumbnail-spec-gym">
            <div className="thumbnail-spec-gym__image">
              <picture>
                <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"/><img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt=""/>
              </picture>
            </div>
            <p className="thumbnail-spec-gym__type">Ближайший зал</p>
            <div className="thumbnail-spec-gym__header">
              <h3 className="thumbnail-spec-gym__title">атлетика</h3>
              <div className="thumbnail-spec-gym__location">
                <svg width="14" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-location"></use>
                </svg>
                <address className="thumbnail-spec-gym__location-address">м. Московская</address>
              </div>
            </div>
            <div className="thumbnail-spec-gym__button-wrapper">
              <a className="btn btn--small thumbnail-spec-gym__button" href="#">Подробнее</a>
              <a className="btn btn--small btn--outlined thumbnail-spec-gym__button" href="#">Все залы</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SpecialWorkouts;
