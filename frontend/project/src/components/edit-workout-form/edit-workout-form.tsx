import { ChangeEvent, useEffect, useState } from "react";
import {
  DescriptionLength,
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
  UserRole,
  WorkoutGender,
} from "../../constant";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Workout } from "../../types/workout";
import { fetchUserAction, updateWorkoutAction } from "../../store/api-action";
import { UserFull } from "../../types/user-full";
import PopupWindow from "../popup-window/popup-window";
import CreateOrder from "../create-order/create-order";

type Props = {
  workout: Workout;
  user: UserFull;
};
enum FormFieldName {
  nameTraining = "nameTraining",
  levelTraining = "levelTraining",
  trainingType = "trainingType",
  trainingTime = "trainingTime",
  price = "price",
  caloriesReset = "caloriesReset",
  descriptionTraining = "descriptionTraining",
  videoTraning = "videoTraning",
  isSpecialOffer = "isSpecialoffer",
}

const EditWorkoutForm = ({ workout, user }: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const isCoach = user.role === UserRole.Coach;

  const [showModal, setShowModal] = useState(false);
  const togglePopup = () => {
    setShowModal(!showModal);
  };

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const handleEditButtonClick = () => {
    setIsEdit((prevIsEdit) => !prevIsEdit);
  };

  const [editData, setEditData] = useState({
    title: workout.title,
    description: workout.description,
    price: workout.price,
  });

  const fieldChangeHandle = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | null>
  ) => {
    const { name, value } = evt.target;
    setEditData({ ...editData, [name]: value });
  };

  const [isDiscount, setDiscount] = useState<boolean>(
    workout.specialOffer ? workout.specialOffer : false
  );

  const setDiscountHandle = () => {
    if (editData.price) {
      setEditData({
        ...editData,
        price: Math.round(
          isDiscount ? editData.price / 0.9 : editData.price * 0.9
        ),
      });
    }
    setDiscount((prevIsDiscount) => !prevIsDiscount);
  };

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title: workout.title,
      description: workout.description,
      price: workout.price,
      specialOffer: isDiscount,
    };

    dispatch(updateWorkoutAction(data));
    setIsEdit(false);
  };

  const [isNotCorrectLength, setSignCorrectLength] = useState<boolean>(false);

  useEffect(() => {
    if (
      editData.description &&
      (editData.description.length < DescriptionLength.MinLength ||
        editData.description.length > DescriptionLength.MaxLength)
    ) {
      setSignCorrectLength(true);
    } else {
      setSignCorrectLength(false);
    }
  }, [editData.description]);

  return (
    <div className="training-card">
      <div className="training-info">
        <h2 className="visually-hidden">Информация о тренировке</h2>
        <div className="training-info__header">
          <div className="training-info__coach">
            <div className="training-info__photo">
              <picture>
                <img
                  src={user.avatar}
                  width="64"
                  height="64"
                  alt="Изображение тренера"
                />
              </picture>
            </div>
            <div className="training-info__coach-info">
              <span className="training-info__label">Тренер</span>
              <span className="training-info__name">{user.name}</span>
            </div>
          </div>
          {isCoach && isEdit && (
            <button
              className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--edit"
              type="submit"
              form="training"
            >
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg>
              <span>Сохранить</span>
            </button>
          )}
          {isCoach && !isEdit && (
            <button
              className="btn-flat btn-flat--light training-info__edit training-info__edit--edit"
              type="button"
              onClick={handleEditButtonClick}
            >
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg>
              <span>Редактировать</span>
            </button>
          )}
        </div>
        <div className="training-info__main-content">
          <form method="get" id="training" onSubmit={submitHandle}>
            <div className="training-info__form-wrapper">
              <div className="training-info__info-wrapper">
                <div className="training-info__input training-info__input--training">
                  <label>
                    <span className="training-info__label">
                      Название тренировки
                    </span>
                    <input
                      type="text"
                      name="title"
                      required
                      minLength={MIN_TITLE_LENGTH}
                      maxLength={MAX_TITLE_LENGTH}
                      disabled={!isEdit}
                      value={editData.title}
                      onChange={fieldChangeHandle}
                    />
                  </label>
                </div>
                <div className="training-info__textarea">
                  <label>
                    <span className="training-info__label">
                      Описание тренировки
                    </span>
                    <span className="custom-input--error">
                      <textarea
                        name="description"
                        placeholder=" "
                        disabled={!isEdit}
                        value={editData.description}
                        onChange={fieldChangeHandle}
                      ></textarea>
                      {isNotCorrectLength && (
                        <span className="custom-textarea__error">
                          Минимальная длина 10 символ. Максимальная длина 140
                          символов
                        </span>
                      )}
                    </span>
                  </label>
                </div>
              </div>
              <div className="training-info__rating-wrapper">
                <div className="training-info__input training-info__input--rating">
                  <label>
                    <span className="training-info__label">Рейтинг</span>
                    <span className="training-info__rating-icon">
                      <svg width="18" height="18" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </span>
                    <input
                      type="number"
                      name="rating"
                      value={workout.rating}
                      disabled
                    />
                  </label>
                </div>
                <ul className="training-info__list">
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>#{workout.type}</span>
                    </div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>
                        {workout.gender === WorkoutGender.Women &&
                          "#для_женщин"}
                        {workout.gender === WorkoutGender.Men && "#для_мужчин"}
                        {workout.gender === WorkoutGender.Everybody &&
                          "#для_всех"}
                      </span>
                    </div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>#{workout.caloriesNumber}ккал</span>
                    </div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>#{workout.time}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="training-info__price-wrapper">
                <div className="training-info__input training-info__input--price">
                  <label>
                    <span className="training-info__label">Стоимость</span>
                    <span className="custom-input__wrapper">
                      <input
                        type="number"
                        name="price"
                        required
                        min="0"
                        disabled={!isEdit}
                        value={editData.price}
                        onChange={fieldChangeHandle}
                      />
                      <span className="custom-input__text">₽</span>
                    </span>
                  </label>
                  <div className="training-info__error">Введите число</div>
                </div>
                {isCoach && (
                  <button
                    className="btn training-info__buy"
                    type="button"
                    disabled
                    onClick={togglePopup}
                  >
                    Купить
                  </button>
                )}
                {!isCoach && (
                  <button
                    className="btn training-info__buy"
                    type="button"
                    onClick={togglePopup}
                  >
                    Купить
                  </button>
                )}
                {showModal && (
                  <PopupWindow handleClose={togglePopup}>
                    <CreateOrder
                      workout={workout}
                      handleClose={togglePopup}
                    />
                  </PopupWindow>
                )}
                {isCoach && (
                  <button
                    className="btn-flat btn-flat--light btn-flat--underlined"
                    type="button"
                    onClick={setDiscountHandle}
                    disabled={!isEdit}
                  >
                    <svg width="14" height="14" aria-hidden="true">
                      <use xlinkHref="#icon-discount"></use>
                    </svg>
                    <span>
                      {isDiscount ? "Отменить скидку" : "Сделать скидку 10%"}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="training-video">
        <h2 className="training-video__title">Видео</h2>
        <div className="training-video__video">
          <div className="training-video__thumbnail">
            <picture>
              <source
                type="image/webp"
                srcSet="img/content/training-video/video-thumbnail.webp, img/content/training-video/video-thumbnail@2x.webp 2x"
              />
              <img
                src="img/content/training-video/video-thumbnail.png"
                srcSet="img/content/training-video/video-thumbnail@2x.png 2x"
                width="922"
                height="566"
                alt="Обложка видео"
              />
            </picture>
          </div>
        </div>
        <button className="training-video__play-button btn-reset">
          <svg width="18" height="30" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="training-video__buttons-wrapper">
        <button
          className="btn training-video__button training-video__button--start"
          type="button"
          disabled
        >
          Приступить
        </button>
        <button
          className="btn training-video__button training-video__button--stop"
          type="button"
        >
          Закончить
        </button>
      </div>
    </div>
  );
};

export default EditWorkoutForm;
