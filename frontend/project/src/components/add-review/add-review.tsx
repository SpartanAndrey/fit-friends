import { useEffect, useState } from 'react';
import { addReviewAction } from '../../store/api-action';
import { useAppDispatch } from '../../hooks';
import { MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH, RATINGS, MAX_RATING_NUMBER } from '../../constant';

type Props ={
  handleClose?: () => void;
  workoutId: number | undefined;
  userId: string;
}

const addReview = ({workoutId, userId, handleClose}: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const [currentRating, setCurrentRating] = useState(MAX_RATING_NUMBER);

  const ratingChangeHandle = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setCurrentRating(Number(value));
    evt.target.setAttribute('checked', 'true');
  };

  const [reviewText, setReviewText] = useState<string>('');

  const handleReviewChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setReviewText(value);
  };
  const [isNotCorrectLength, setSignCorrectLength] = useState<boolean>(false);
  useEffect(() => {
    if (
      reviewText && (reviewText.length < MIN_REVIEW_LENGTH
      || reviewText.length > MAX_REVIEW_LENGTH)
    ) {
      setSignCorrectLength(true);
    }
    else {
      setSignCorrectLength(false);
    }
  }, [reviewText]);

  const [isDone, setSignDone] = useState(false);

  const addReviewHandle = () => {
    if (!isNotCorrectLength && workoutId && userId) {
      const data = {
        userId: userId,
        workoutId: workoutId,
        rating: Number(currentRating),
        text: reviewText
      };
      dispatch(addReviewAction(data));
      setSignDone(true);
    }
  };

  useEffect (() => {
    if(isDone && handleClose) {
      handleClose();
    }
  },[dispatch, handleClose, isDone, workoutId]
  );
  

  return (
    <section className="popup">
      <div className="popup__wrapper">
        <div className="popup-head">
          <h2 className="popup-head__header">Оставить отзыв</h2>
          <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={handleClose}>
            <svg width="20" height="20" aria-hidden="true">
              <use xlinkHref="#icon-cross"></use>
            </svg>
          </button>
        </div>
        <div className="popup__content popup__content--feedback">
          <h3 className="popup__feedback-title">Оцените тренировку</h3>
          <ul className="popup__rate-list">
            {RATINGS.map((el) => (
              <li className="popup__rate-item" key={el}>
                <div className="popup__rate-item-wrap">
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      aria-label={`оценка ${el}.`}
                      id={el.toString()}
                      value={el}
                      checked={el === currentRating}
                      required
                      onChange={ratingChangeHandle}
                    />
                    <span className="popup__rate-number">{el}</span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <div className="popup__feedback">
            <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
            <div className="popup__feedback-textarea">
              <div className="custom-textarea">
                <label>
                  <span className="custom-input--error">
                    <textarea name="description" placeholder=" " onChange={handleReviewChange}></textarea>
                    {isNotCorrectLength &&
                          <span className="custom-textarea__error">Минимальная длина 100 символ. Максимальная длина 1024 символов</span>}
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="popup__button">
            <button
              className="btn"
              type="button"
              disabled={isDone}
              onClick={addReviewHandle}
            >Продолжить
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default addReview;
