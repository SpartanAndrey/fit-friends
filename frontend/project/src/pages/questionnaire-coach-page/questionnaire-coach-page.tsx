import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { AppRoute, CoachDescriptionLength, LEVELS, UserLevel, WORKOUT_TYPES, WorkoutType } from '../../constant';
import { useLocation } from 'react-router-dom';
import { QuestionnaireCoachData } from '../../types/questionnaire-coach-data';
import { redirectToRoute } from '../../store/action';
import { registerCoachAction } from '../../store/api-action';

enum InputNameEnum {
  PersonalWorkout = 'personal-workout',
}

function QuestionnaireCoachPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const location = useLocation();

  const regData = location.state.regData;

  const submitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data: QuestionnaireCoachData = {
      level: String(levelUser),
      workoutTypes: choosenWorkoutTypes,
      certificate: String(coachCertificate),
      coachInfo: String(coachInfo),
      isReadyToCoach: isReadyToCoach,
      fileCertificate: coachCertificate,
    };

    const totalData = { ...data, ...regData };

    dispatch(registerCoachAction(totalData));
    dispatch(redirectToRoute(AppRoute.CoachPersonalAccount));
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [coachCertificate, setCoachCertificate] = useState<File>();

  const certificateUploadHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setCoachCertificate(evt.target.files[0]);
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

  const [coachInfo, setCoachInfo] = useState<string>('');
  const descritionChangeHandle = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setCoachInfo(value);
  };
  const [isNotCorrectLength, setSignCorrectLength] = useState<boolean>(false);
  useEffect(() => {
    if (
      coachInfo && (coachInfo.length < CoachDescriptionLength.MinLength
      || coachInfo.length > CoachDescriptionLength.MaxLength)
    ) {
      setSignCorrectLength(true);
    }
    else {
      setSignCorrectLength(false);
    }
  }, [coachInfo]);

  const [isReadyToCoach, setIsReadyToCoach] = useState(false);

  const inputChangeHandle = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = evt.target as HTMLInputElement;
    const name = target.name;

    if (name === InputNameEnum.PersonalWorkout) {
      setIsReadyToCoach(!isReadyToCoach);
    }
  }


  return (
    <div className="popup-form popup-form--questionnaire-coach">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__form">
            <form
              method="get"
              onSubmit={submitHandle}
            >
              <div className="questionnaire-coach">
                <h1 className="visually-hidden">Опросник</h1>
                <div className="questionnaire-coach__wrapper">
                  <div className="questionnaire-coach__block custom-input--error"><span className="questionnaire-coach__legend">Ваша специализация (тип) тренировок</span>
                    <div className="specialization-checkbox questionnaire-coach__specializations">
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
                    {isNotWorkoutType &&
                          <span className="custom-input__error">Необходимо выбрать 1-3 значений</span>}
                  </div>
                  <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Ваш уровень</span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-coach__radio">
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
                  <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Ваши дипломы и сертификаты</span>
                    <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                      <label>
                        <span
                          className="drag-and-drop__label"
                          tabIndex={0}
                        >
                          {coachCertificate ? coachCertificate.name : 'Загрузите сюда файлы формата PDF'}
                          <svg width="20" height="20" aria-hidden="true">
                            <use xlinkHref="#icon-import"></use>
                          </svg>
                        </span>
                        <input
                          type="file"
                          name="import"
                          accept=".pdf"
                          ref={inputRef}
                          required
                          onChange={certificateUploadHandle}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Расскажите о своём опыте, который мы сможем проверить</span>
                    <div className="custom-textarea questionnaire-coach__textarea">
                      <label>
                        <span className="custom-input--error">
                          <textarea
                            id="coachInfo"
                            name="coachInfo"
                            placeholder=" "
                            onChange={descritionChangeHandle}
                          >
                          </textarea>
                          {isNotCorrectLength &&
                          <span className="custom-textarea__error">Минимальная длина 10 символ. Максимальная длина 140 символов</span>}
                        </span>
                      </label>
                    </div>
                    <div className="questionnaire-coach__checkbox">
                      <label>
                        <input onChange={inputChangeHandle} type="checkbox" value="individual-training" name={InputNameEnum.PersonalWorkout} checked={isReadyToCoach}/>
                        <span className="questionnaire-coach__checkbox-icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="questionnaire-coach__checkbox-label">Хочу дополнительно индивидуально тренировать</span>
                      </label>
                    </div>
                  </div>
                </div>
                <button className="btn questionnaire-coach__button" type="submit">Продолжить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionnaireCoachPage;
