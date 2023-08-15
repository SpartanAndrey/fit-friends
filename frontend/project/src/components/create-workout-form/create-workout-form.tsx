import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AppRoute, DescriptionLength, LEVELS, MAX_CALORIES_NUMBER, MAX_TITLE_LENGTH, MIN_CALORIES_NUMBER, MIN_TITLE_LENGTH, NameLength, UserLevel, UserRole, WORKOUT_GENDERS, WORKOUT_TIMES, WORKOUT_TYPES, WorkoutGender, WorkoutTime, WorkoutType } from "../../constant";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Workout } from "../../types/workout";
import { createWorkoutAction, fetchUserAction, updateWorkoutAction } from "../../store/api-action";
import { UserFull } from "../../types/user-full";
import PopupWindow from "../popup-window/popup-window";
import CreateOrder from "../create-order/create-order";
import { UserCoach } from "../../types/user-coach";
import { getUserCoach } from "../../store/user-process/user-selectors";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
import { redirectToRoute } from "../../store/action";
import Header from "../header/header";

const CreateWorkoutForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const coach = useAppSelector(getUserCoach);

  if (!coach) {
    return <NotFoundPage />;
  }

  const isCoach = coach.role === UserRole.Coach;

  const [editData, setEditData] = useState({
    title: '',
    description: '',
    price: 0,
    caloriesNumber: 0,
  });

  const fieldChangeHandle = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | null>
  ) => {
    const { name, value } = evt.target;
    setEditData({ ...editData, [name]: value });
  };

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const toggleButtonClickHandle = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  const [currentType, setCurrentType] = useState(WorkoutType.Aerobics);

  const typeChangeHandle = (evt: React.MouseEvent<HTMLLIElement>) => {
    setCurrentType(evt.currentTarget.innerText as WorkoutType);
    evt.currentTarget.setAttribute('aria-selected', 'true');
    setIsOpened(false);
  };

  const [currentTime, setCurrentTime] = useState(WorkoutTime.Short);

  const timeChangeHandle = (evt: React.MouseEvent<HTMLLIElement>) => {
    setCurrentTime(evt.currentTarget.innerText as WorkoutTime);
    evt.currentTarget.setAttribute('aria-selected', 'true');
    setIsOpened(false);
  };

  const [currentLevel, setCurrentLevel] = useState(UserLevel.Beginner);

  const levelChangeHandle = (evt: React.MouseEvent<HTMLLIElement>) => {
    setCurrentLevel(evt.currentTarget.innerText as UserLevel);
    evt.currentTarget.setAttribute('aria-selected', 'true');
    setIsOpened(false);
  };

  const [currentGender, setGender] = useState(WorkoutGender.Everybody);

  const genderChangeHandle = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setGender(value as WorkoutGender);
    evt.target.setAttribute('checked', 'true');
  };

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title: editData.title,
      description: editData.description,
      price: Number(editData.price),
      caloriesNumber: Number(editData.caloriesNumber),
      type: currentType,
      time: currentTime,
      level: currentLevel,
      gender: currentGender,
      backgroundImage: '',
      coachId: coach.id,
      specialOffer: false,
    };

    dispatch(createWorkoutAction(data));
    dispatch(redirectToRoute(AppRoute.PersonalAccountCoach));
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
    <div className="wrapper">
      <Header />
      <main>
        <div className="popup-form popup-form--create-training">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Создание тренировки</h1>
              </div>
              <div className="popup-form__form">
                <form method="get" onSubmit={submitHandle}>
                  <div className="create-training">
                    <div className="create-training__wrapper">
                      <div className="create-training__block">
                        <h2 className="create-training__legend">
                          Название тренировки
                        </h2>
                        <div className="custom-input create-training__input">
                          <label>
                            <span className="custom-input__wrapper">
                              <input
                                onChange={fieldChangeHandle}
                                name="title"
                                type="text"
                                minLength={NameLength.MinLength}
                                maxLength={NameLength.MaxLength}
                                value={editData.title}
                                pattern="^[A-Za-zА-Яа-яЁё\s]+$"
                                title="Только буквы русского/английского алфавита"
                                required
                              />
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">
                          Характеристики тренировки
                        </h2>
                        <div className="create-training__info">
                          <div className={`custom-select ${isOpened ? 'is-open' : 'custom-select--not-selected'} not-empty`}>
                            <span className="custom-select__label">
                              Выберите тип тренировки
                            </span>
                            <button
                              className="custom-select__button"
                              type="button"
                              aria-label="Выберите одну из опций"
                              onClick={() => toggleButtonClickHandle}
                            >
                              <span className="custom-select__text">
                                {currentType}
                              </span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </button>
                            <ul className="custom-select__list" role="listbox">
                              {WORKOUT_TYPES.map((el) => (
                                <li
                                  key={el}
                                  role="option"
                                  tabIndex={0}
                                  className="custom-select__item"
                                  aria-selected={currentType === el}
                                  onClick={typeChangeHandle}
                                >
                                  {el}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label>
                              <span className="custom-input__label">
                                Сколько калорий потратим
                              </span>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  onChange={fieldChangeHandle}
                                  value={editData.caloriesNumber}
                                  name="caloriesNumber"
                                  required
                                  min={MIN_CALORIES_NUMBER}
                                  max={MAX_CALORIES_NUMBER}
                                />
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                          </div>
                          <div className={`custom-select ${isOpened ? 'is-open' : 'custom-select--not-selected'} not-empty`}>
                            <span className="custom-select__label">
                              Сколько времени потратим
                            </span>
                            <button
                              className="custom-select__button"
                              type="button"
                              aria-label="Выберите одну из опций"
                              onClick={() => toggleButtonClickHandle}
                            >
                              <span className="custom-select__text">
                                {currentTime}
                              </span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </button>
                            <ul className="custom-select__list" role="listbox">
                              {WORKOUT_TIMES.map((el) => (
                                <li
                                  key={el}
                                  role="option"
                                  tabIndex={0}
                                  className="custom-select__item"
                                  aria-selected={currentTime === el}
                                  onClick={timeChangeHandle}
                                >
                                  {el}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label>
                              <span className="custom-input__label">
                                Стоимость тренировки
                              </span>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  onChange={fieldChangeHandle}
                                  name="price"
                                  value={editData.price}
                                  required
                                />
                                <span className="custom-input__text">₽</span>
                              </span>
                            </label>
                          </div>
                          <div className={`custom-select ${isOpened ? 'is-open' : 'custom-select--not-selected'} not-empty`}>
                            <span className="custom-select__label">
                              Выберите уровень тренировки
                            </span>
                            <button
                              className="custom-select__button"
                              type="button"
                              aria-label="Выберите одну из опций"
                              onClick={() => toggleButtonClickHandle}
                            >
                              <span className="custom-select__text"></span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </button>
                            <ul className="custom-select__list" role="listbox">
                              {LEVELS.map((el) => (
                                <li
                                  key={el}
                                  role="option"
                                  tabIndex={0}
                                  className="custom-select__item"
                                  aria-selected={currentLevel === el}
                                  onClick={levelChangeHandle}
                                >
                                  {el}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="create-training__radio-wrapper">
                            <span className="create-training__label">
                              Кому подойдет тренировка
                            </span>
                            {WORKOUT_GENDERS.map((el) => (
                              <div
                                className="custom-toggle-radio__block"
                                key={el}
                              >
                                <label htmlFor={el}>
                                  {el === WorkoutGender.Men ? (
                                    <input
                                      type="radio"
                                      id={el}
                                      name="sex"
                                      value={el}
                                      required
                                      onChange={genderChangeHandle}
                                    />
                                  ) : (
                                    <input
                                      type="radio"
                                      id={el}
                                      name="sex"
                                      value={el}
                                      onChange={genderChangeHandle}
                                    />
                                  )}
                                  <span className="custom-toggle-radio__icon"></span>
                                  <span className="custom-toggle-radio__label">
                                    {el}
                                  </span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">
                          Описание тренировки
                        </h2>
                        <div className="custom-textarea create-training__textarea">
                          <label>
                            <textarea
                              name="description"
                              placeholder=" "
                              value={editData.description}
                              onChange={fieldChangeHandle}
                            ></textarea>
                            {isNotCorrectLength && (
                              <span className="custom-textarea__error">
                                Минимальная длина 10 символ. Максимальная длина
                                140 символов
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">
                          Загрузите видео-тренировку
                        </h2>
                        <div className="drag-and-drop create-training__drag-and-drop">
                          <label>
                            <span className="drag-and-drop__label">
                              Загрузите сюда файлы формата MOV, AVI или MP4
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import-video"></use>
                              </svg>
                            </span>
                            <input
                              type="file"
                              name="import"
                              accept=".mov, .avi, .mp4"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn create-training__button"
                      type="submit"
                    >
                      Опубликовать
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateWorkoutForm;
