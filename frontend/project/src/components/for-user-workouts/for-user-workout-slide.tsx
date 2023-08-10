import { Workout } from "../../types/workout"

type Props = {
  workout: Workout;
}

function ForUserWorkoutSlide({workout}: Props): JSX.Element {
  return(
    <li className="special-for-you__item">
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            <img src={workout.backgroundImage} srcSet={workout.backgroundImage} width="452" height="191" alt=""/>
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">{workout.type}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <a className="btn btn--small thumbnail-preview__button" href="#">Подробнее</a>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ForUserWorkoutSlide;
