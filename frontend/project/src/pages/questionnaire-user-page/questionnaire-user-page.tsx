import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { AppRoute, LEVELS, MAX_CALORIES_NUMBER, MIN_CALORIES_NUMBER, UserLevel, WORKOUT_TIMES, WORKOUT_TYPES, WorkoutTime, WorkoutType } from '../../constant';
import { useLocation } from 'react-router-dom';
import { redirectToRoute } from '../../store/action';
import { registerUserAction } from '../../store/api-action';
import { QuestionnaireUserData } from '../../types/questionnaire-user-data';

enum InputNameEnum {
  PersonalWorkout = 'personal-workout',
}

function QuestionnaireUserPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const location = useLocation();

  const regData = location.state.regData;

  const submitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data: QuestionnaireUserData = {
      level: String(levelUser),
      workoutTypes: choosenWorkoutTypes,
      workoutTime: String(choosenWorkoutTime),
      caloriesToBurnNumber: caloriesToBurnNumber,
      caloriesToSpendNumber: caloriesToSpendNumber,
    };

    const totalData = { ...data, ...regData };

    dispatch(registerUserAction(totalData));
    dispatch(redirectToRoute(AppRoute.Main));
  };

  const [choosenWorkoutTypes, setChoosenWorkoutTypes] = useState<WorkoutType[]>([]);

  const [isNotWorkoutType, setIsNotWorkoutType] = useState(false);

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

  const [levelUser, setlevelUser] = useState<UserLevel>(UserLevel.Beginner);

  const levelChangeHandle = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setlevelUser(value as UserLevel);
    evt.target.setAttribute('checked', 'true');
  };

  const [choosenWorkoutTime, setChoosenWorkoutTime] = useState<WorkoutTime>();

  const workoutTimeChangeHandle = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setChoosenWorkoutTime(value as WorkoutTime);
    evt.target.setAttribute('checked', 'true');
  };

  const [caloriesToBurnNumber, setCaloriesToBurnNumber] = useState<number>(MIN_CALORIES_NUMBER);

  const [caloriesToSpendNumber, setCaloriesToSpendNumber] = useState<number>(MIN_CALORIES_NUMBER);

  const caloriesToBurnChangeHandle = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setCaloriesToBurnNumber(+value);
  };

  const caloriesToSpendChangeHandle = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setCaloriesToSpendNumber(+value);
  };

  return (
    <div className="popup-form popup-form--questionnaire-user">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__form">
            <form
              method="get"
              onSubmit={submitHandle}
            >
              <div className="questionnaire-user">
                <h1 className="visually-hidden">Опросник</h1>
                <div className="questionnaire-user__wrapper">
                  <div className={`questionnaire-user__block ${isNotWorkoutType ? 'custom-input--error' : ''}`}>
                    <span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
                    <div className="specialization-checkbox questionnaire-user__specializations">
                      {WORKOUT_TYPES.map((el) => (
                        <div className="btn-checkbox" key={el}>
                          <label>
                            <input
                              className="visually-hidden"
                              type="checkbox"
                              name="specialisation"
                              value={el}
                              id={el}
                              onChange={workoutTypesChangeHandle}
                            />
                            <span className="btn-checkbox__btn">{el}</span>
                          </label>
                        </div>
                      ))}
                    </div>

                    <span className="custom-input__error">{isNotWorkoutType ? 'Необходимо выбрать 1-3 значений' : '_'}</span>

                  </div>
                  <div className="questionnaire-user__block">
                    <span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                      {WORKOUT_TIMES.map((el) =>
                        (
                          <div className="custom-toggle-radio__block" key={el}>
                            <label>
                              {el === WorkoutTime.Short ?
                                (
                                  <input
                                    type="radio"
                                    name="time"
                                    id={el}
                                    value={el}
                                    required
                                    onChange={workoutTimeChangeHandle}
                                  />
                                )
                                :
                                (
                                  <input
                                    type="radio"
                                    name="time"
                                    id={el}
                                    value={el}
                                    onChange={workoutTimeChangeHandle}
                                  />
                                )}
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">{el}</span>
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваш уровень</span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                      {LEVELS.map((el)=>
                        (
                          <div className="custom-toggle-radio__block" key={el}>
                            <label>
                              {el === UserLevel.Beginner ?
                                (
                                  <input
                                    type="radio"
                                    name="level"
                                    id={el}
                                    value={el}
                                    required
                                    onChange={levelChangeHandle}
                                  />
                                )
                                :
                                (
                                  <input
                                    type="radio"
                                    name="level"
                                    id={el}
                                    value={el}
                                    onChange={levelChangeHandle}
                                  />
                                )}
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">{el}</span>
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="questionnaire-user__block">
                    <div className="questionnaire-user__calories-lose"><span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                      <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                        <label>
                          <span className="custom-input__wrapper">
                            <input
                              type="number"
                              onChange={caloriesToBurnChangeHandle}
                              name="caloriesToBurnNumber"
                              value={caloriesToBurnNumber}
                              required
                              min={MIN_CALORIES_NUMBER}
                              max={MAX_CALORIES_NUMBER}
                            />
                            <span className="custom-input__text">ккал</span>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="questionnaire-user__calories-waste"><span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                      <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                        <label>
                          <span className="custom-input__wrapper">
                            <input
                              type="number"
                              onChange={caloriesToSpendChangeHandle}
                              name="caloriesToSpendNumber"
                              value={caloriesToSpendNumber}
                              required
                              min={MIN_CALORIES_NUMBER}
                              max={MAX_CALORIES_NUMBER}
                            />
                            <span className="custom-input__text">ккал</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn questionnaire-user__button" type="submit">Продолжить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionnaireUserPage;
