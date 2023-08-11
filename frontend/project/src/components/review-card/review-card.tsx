import { Review } from "../../types/review";

type Props = {
  review: Review;
};

const ReviewCard = ({ review }: Props): JSX.Element => {



  return (
    <div className="review">
      <div className="review__user-info">
        <div className="review__user-photo">
          <picture>
            <img src="{user.avatar}" width="64" height="64" alt="Изображение пользователя" />
          </picture>
        </div>
        <span className="review__user-name">Имя</span> //надо как-то имя достать
        <div className="review__rating">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <span>{review.rating}</span>
        </div>
      </div>
      <p className="review__review">{review.text}</p>
    </div>
  );
};

export default ReviewCard;
