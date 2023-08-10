import { ChangeEvent, useState } from 'react';
import { updateUserCoachAction } from '../../store/api-action';
import { useAppDispatch } from '../../hooks';
import { UserCoach } from '../../types/user-coach';
import { UserGender, UserLevel, WorkoutType, UserLocation, DescriptionLength, LEVELS, WORKOUT_TYPES, LOCATIONS, GENDERS, NameLength, NAME_PATTERN } from '../../constant';

type Props = {
  coach: UserCoach;
}

const CoachInfo = ({ coach }: Props): JSX.Element => {

  const dispatch = useAppDispatch();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [editData, setEditData] = useState({
    name: coach.name,
    description: coach.description,
  });

  const [isReady, setIsReady] = useState(coach.isReadyToCoach);

  const fieldChangeHandle = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | null>) => {
    const { name, value } = evt.target;
    setEditData({ ...editData, [name]: value });
  };
  
  const [choosenWorkoutTypes, setChoosenWorkoutTypes] = useState<WorkoutType[]>(coach.workoutType);

  const [isNotWorkoutType, setIsNotWorkoutType] = useState(!(coach.workoutType.length >= 1 && coach.workoutType.length <= 3));

  const workoutTypesChangeHandle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;

    const isChecked = choosenWorkoutTypes.find((el) => el === value);

    if (isChecked) {
      const array = choosenWorkoutTypes.filter((el) => el !== value);
      setChoosenWorkoutTypes(array);
      evt.target.removeAttribute('checked');
      array.length === 0 ? setIsNotWorkoutType(true) : setIsNotWorkoutType(false);
    }
    else {
      (choosenWorkoutTypes.length > 2 ) ? setIsNotWorkoutType(true) : setIsNotWorkoutType(false);
      setChoosenWorkoutTypes([...choosenWorkoutTypes, value as WorkoutType]);
      evt.target.setAttribute('checked', 'true');
    }
  };

  const BUTTONS_STATE = {location: false, gender: false, level: false};
  const [isOpened, setIsOpened] = useState(BUTTONS_STATE);

  const handleToggleButtonClick = (title: string) => {
    if (title === 'location' || title === 'gender' || title === 'level') {
      setIsOpened({...isOpened, [title]: !isOpened[title]});
    }
  };

  const [currentLevel, setcurrentLevel] = useState<UserLevel>(coach.level);

  const levelChangeHandle = (evt: React.MouseEvent<HTMLLIElement>) => {
    setcurrentLevel(evt.currentTarget.innerText as UserLevel);
    evt.currentTarget.setAttribute('aria-selected', 'true');
    setIsOpened({...isOpened, ['level']: false});
  };

  const [currentLocation, setLocation] = useState(coach.location);

  const locationChangeHandle = (evt: React.MouseEvent<HTMLLIElement>) => {
    setLocation(evt.currentTarget.innerText as UserLocation);
    evt.currentTarget.setAttribute('aria-selected', 'true');
    setIsOpened({...isOpened, ['location']: false});
  };

  const [currentGender, setGender] = useState(coach.gender);

  const genderChangeHandle = (evt: React.MouseEvent<HTMLLIElement>) => {
    setGender(evt.currentTarget.innerText as UserGender);
    evt.currentTarget.setAttribute('aria-selected', 'true');
    setIsOpened({...isOpened, ['level']: false});
  };

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: editData.name,
      gender: currentGender,
      description: editData.description,
      location: currentLocation,
      level: currentLevel,
      workoutType: choosenWorkoutTypes,
      isReadyToCoach: isReady,
    };

    if (!isNotWorkoutType) {
      dispatch(updateUserCoachAction(data));
      setIsEdit(false);
    }
  };

  return (
    <section className="user-info-edit">
      <div className="user-info-edit__header">
        <div className="input-load-avatar">
          <label>
            <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg" /><span className="input-load-avatar__avatar"><img src="img/content/user-photo-1.png" srcSet="img/content/user-photo-1@2x.png 2x" width="98" height="98" alt="user photo" /></span>
          </label>
        </div>
        <div className="user-info-edit__controls">
          <button className="user-info-edit__control-btn" aria-label="обновить">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-change"></use>
            </svg>
          </button>
          <button className="user-info-edit__control-btn" aria-label="удалить">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-trash"></use>
            </svg>
          </button>
        </div>
      </div>
      <form className="user-info-edit__form" action="#" method="post" onSubmit={submitHandle}>
        <button className="btn-flat btn-flat--underlined user-info-edit__save-button" type="submit" aria-label={isEdit ? 'Сохранить' : 'Редактировать'}>
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit"></use>
          </svg><span>{isEdit ? 'Сохранить' : 'Редактировать'}</span>
        </button>
        <div className="user-info-edit__section">
          <h2 className="user-info-edit__title">Обо мне</h2>
          <div className="custom-input user-info-edit__input">
            <label><span className="custom-input__label">Имя</span><span className="custom-input__wrapper">
              <input
                readOnly={!isEdit}
                pattern={NAME_PATTERN}
                required={true}
                type="text"
                minLength={NameLength.MinLength}
                maxLength={NameLength.MaxLength}
                onChange={fieldChangeHandle}
                value={coach.name}
                name="name"
              /></span>
            </label>
          </div>
          <div className="custom-textarea user-info-edit__textarea">
            <label><span className="custom-textarea__label">Описание</span>
              <textarea
                readOnly={!isEdit}
                onChange={fieldChangeHandle}
                minLength={DescriptionLength.MinLength}
                maxLength={DescriptionLength.MaxLength}
                name="description"
                value={coach?.description}>{coach?.description}
              </textarea>
            </label>
          </div>
        </div>
        <div className="user-info-edit__section user-info-edit__section--status">
          <h2 className="user-info-edit__title user-info-edit__title--status">Статус</h2>
          <div className="custom-toggle custom-toggle--switch user-info-edit__toggle">
            <label>
              <input disabled={!isEdit} type="checkbox" name="isReadyToCoach" checked={isReady} onChange={() => setIsReady(!isReady)} /><span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-check"></use>
                </svg></span><span className="custom-toggle__label">Готов тренировать</span>
            </label>
          </div>
        </div>
        <div className="user-info-edit__section">
          <h2 className="user-info-edit__title user-info-edit__title--specialization">Специализация</h2>
          <div className="specialization-checkbox user-info-edit__specialization">
            {WORKOUT_TYPES.map((el) => (
              <div className="btn-checkbox" key={el}>
                <label>
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    name="specialisation"
                    value={el}
                    id={el}
                    checked={!!choosenWorkoutTypes.find((item) => el === item)}
                    onChange={workoutTypesChangeHandle}
                    disabled={!isEdit}
                  />
                  <span className="btn-checkbox__btn">{el}</span>
                </label>
              </div>
            ))}
          </div>
          {isNotWorkoutType && isEdit && <span className="custom-input__error">Необходимо выбрать 1-3 значений</span>}
        </div>
        <div
          className={`${isEdit ? '' : 'custom-select--readonly'} custom-select ${isOpened.location ? 'is-open' : 'custom-select--not-selected'} user-info${isEdit ? '-edit' : ''}__select`}>
          <span className="custom-select__label">Локация</span>
          <div className="custom-select__placeholder">ст. м. {currentLocation}</div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            onClick={()=>handleToggleButtonClick('location')}
            disabled={!isEdit}
          >
            <span className="custom-select__text">{currentLocation}</span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox">
            {LOCATIONS.map((el) =>
              (
                <li
                  key={el}
                  role="option"
                  tabIndex={0}
                  className="custom-select__item"
                  aria-selected={currentLocation === el}
                  onClick={locationChangeHandle}
                >
                  {el}
                </li>
              ))}
          </ul>
        </div>
        <div className={`${isEdit ? '' : 'custom-select--readonly'} custom-select ${isOpened.gender? 'is-open' : 'custom-select--not-selected'} user-info${isEdit ? '-edit' : ''}__select`}>
          <span className="custom-select__label">Пол</span>
          <div className="custom-select__placeholder">{currentGender}</div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            onClick={()=>handleToggleButtonClick('gender')}
            disabled={!isEdit}
          >
            <span className="custom-select__text">{currentGender}</span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox">
            {GENDERS.map((el) =>
              (
                <li
                  key={el}
                  role="option"
                  tabIndex={0}
                  className="custom-select__item"
                  aria-selected={currentGender === el}
                  onClick={genderChangeHandle}
                >
                  {el}
                </li>
              ))}
          </ul>
        </div>
        <div className={`${isEdit ? '' : 'custom-select--readonly'} custom-select  ${isOpened.level ? 'is-open' : 'custom-select--not-selected'} user-info${isEdit ? '-edit' : ''}__select`}>
          <span className="custom-select__label">Уровень</span>
          <div className="custom-select__placeholder">{currentLevel}</div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            onClick={()=>handleToggleButtonClick('level')}
            disabled={!isEdit}
          >
            <span className="custom-select__text"></span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox">
            {LEVELS.map((el) =>
              (
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
      </form>
    </section>
  );
};

export default CoachInfo;
