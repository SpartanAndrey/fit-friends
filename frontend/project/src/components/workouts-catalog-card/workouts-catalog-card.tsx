import { Workout } from '../../types/workout'

type Props = {
  workout: Workout,
}

function WorkoutsCatalogCard({workout}: Props): JSX.Element {
  return(
    <li className="training-catalog__item">
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <source type="image/webp" srcSet={workout.backgroundImage}/>
            <img src={workout.backgroundImage} width="330" height="190" alt=""/>
          </picture>
        </div>
        <p className="thumbnail-training__price">{workout.price > 0 ? workout.price : 'Бесплатно'}
        </p>
        <h3 className="thumbnail-training__title">{workout.title}</h3>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag"><span>#{workout.type}</span></div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag"><span>#{workout.caloriesNumber}ккал</span></div>
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg><span className="thumbnail-training__rate-value">{workout.rating}</span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">{workout.description}</p>
        </div>
        <div className="thumbnail-training__button-wrapper">
          <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
          <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
        </div>
      </div>
    </div>
  </li>
  )
}

export default WorkoutsCatalogCard;
