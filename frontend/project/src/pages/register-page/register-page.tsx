import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { validatePassword } from '../../utils/utils';
import { AppRoute, GENDERS, LOCATIONS, NameLength, TEXT_ROLES, UserGender, UserLocation, UserRole, UserRoleText } from '../../constant';
import { useNavigate } from 'react-router-dom';
import { RegisteredUserData } from '../../types/registered-user-data';
import { getEmailExistenceCheck } from '../../store/user-process/user-selectors';
import { checkEmail } from '../../store/api-action';

function RegisterPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isEmailExist = useAppSelector(getEmailExistenceCheck);

  const [regData, setRegData] = useState({
    name: '',
    email: '',
    dateBirth: '',
    password: '',
  });

  const fieldChangeHandle = (evt: ChangeEvent<HTMLInputElement | null>) => {
    const {name, value} = evt.target;
    setRegData({...regData, [name]: value});
  };

  const submitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.target as HTMLFormElement);

    const data: RegisteredUserData = {
      name: String(regData.name),
      email: String(regData.email),
      dateBirth: String(regData.dateBirth),
      location: currentLocation,
      password: String(regData.password),
      gender: currentGender,
      role: currentRole,
      avatar: String(userAvatar),
    };

    if (validatePassword(data.password)) {
      formData.get('role') === UserRole.Coach ? navigate(AppRoute.QuestionnaireCoach, { state: { regForm: data } }) : navigate(AppRoute.QuestionnaireUser, { state: { regForm: data } });
    }

  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [userAvatar, setUserAvatar] = useState<File>();

  const avatarUploadHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setUserAvatar(evt.target.files[0]);
  };

  const inputEmailHandle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(checkEmail({login: evt.target.value, password: ' '}));
    setRegData({...regData, email: evt.target.value});
  };

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleToggleButtonClick = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  const [currentLocation, setLocation] = useState(UserLocation.Petrogradskaya);

  const locationChangeHandle = (evt: React.MouseEvent<HTMLLIElement>) => {
    setLocation(evt.currentTarget.innerText as UserLocation);
    evt.currentTarget.setAttribute('aria-selected', 'true');
    setIsOpened(false);
  };

  const [currentGender, setGender] = useState(UserGender.NoMatter);

  const genderChangeHandle = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setGender(value as UserGender);
    evt.target.setAttribute('checked', 'true');
  };

  const [currentRole, setCurrentRole] = useState(UserRole.Coach);

  const roleChangeHandle = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    const role = value === UserRoleText.Coach ? UserRole.Coach : UserRole.User;
    setCurrentRole(role);
    evt.target.setAttribute('checked', 'true');
  };

  const [agreement, setAgreement] = useState(false);

  const handleAgreementChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (agreement) {
      setAgreement(false);
      evt.target.removeAttribute('checked');
    }
    setAgreement(true);
    evt.target.setAttribute('checked', 'true');
  };

  return(
    <div className='wrapper'>
      <main>
        <div className='background-logo'>
          <svg className='background-logo__logo' width='750' height='284' aria-hidden='true'>
            <use xlinkHref='#logo-big'></use>
          </svg>
          <svg className='background-logo__icon' width='343' height='343' aria-hidden='true'>
            <use xlinkHref='#icon-logotype'></use>
          </svg>
        </div>
        <div className='popup-form popup-form--sign-up'>
      <div className='popup-form__wrapper'>
        <div className='popup-form__content'>
          <div className='popup-form__title-wrapper'>
            <h1 className='popup-form__title'>Регистрация</h1>
          </div>
          <div className='popup-form__form'>
            <form
              method='get'
              onSubmit={submitHandle}
            >
              <div className='sign-up'>
                <div className='sign-up__load-photo'>
                  <div className='input-load-avatar'>
                    <label>
                      <input
                        className='visually-hidden'
                        type='file'
                        accept='image/png, image/jpeg'
                        ref={inputRef}
                        required
                        onChange={avatarUploadHandle}
                      />
                      {userAvatar ? (
                        <img
                          src={URL.createObjectURL(userAvatar)}
                          alt='Avatar preview'
                          className='register-form__avatar-preview'
                        />
                      ) : (
                        <span className='input-load-avatar__btn' >
                          <svg width='20' height='20' aria-hidden='true'>
                            <use xlinkHref='#icon-import'></use>
                          </svg>
                        </span>
                      )}
                    </label>
                  </div>
                  <div className='sign-up__description'>
                    <h2 className='sign-up__legend'>Загрузите фото профиля</h2>
                    <span className='sign-up__text'>JPG, PNG, оптимальный размер 100×100&nbsp;px</span>
                  </div>
                </div>
                <div className='sign-up__data'>
                  <div className='custom-input'>
                    <label><span className='custom-input__label'>Имя</span>
                      <span className='custom-input__wrapper'>
                        <input
                          onChange={fieldChangeHandle}
                          name='name'
                          type='text'
                          minLength={NameLength.MinLength}
                          maxLength={NameLength.MaxLength}
                          pattern='^[A-Za-zА-Яа-яЁё\s]+$'
                          title='Только буквы русского/английского алфавита'
                          required
                        />
                      </span>
                    </label>
                  </div>
                  <div className='custom-input'>
                    <label><span className='custom-input__label'>E-mail</span>
                      <span className='custom-input__wrapper custom-input--error'>
                        <input
                          onChange={inputEmailHandle}
                          name='email'
                          type='email'
                          required
                        />
                        {isEmailExist &&
                      <span className='custom-input__error'>Пользователь с таким email уже зарегистрирован</span>}
                      </span>
                    </label>
                  </div>
                  <div className='custom-input'>
                    <label><span className='custom-input__label'>Дата рождения</span>
                      <span className='custom-input__wrapper'>
                        <input onChange={fieldChangeHandle} type='date' name='dateBirth' max='2099-12-31' required/>
                      </span>
                    </label>
                  </div>
                  <div className={`custom-select ${isOpened ? 'is-open' : 'custom-select--not-selected'} not-empty`}>
                    <span className='custom-select__label'>Ваша локация</span>
                    <button
                      className='custom-select__button'
                      type='button'
                      aria-label='Выберите одну из опций'
                      onClick={()=>handleToggleButtonClick}
                    >
                      <span className='custom-select__text'>{currentLocation}</span>
                      <span className='custom-select__icon'>
                        <svg width='15' height='6' aria-hidden='true'>
                          <use xlinkHref='#arrow-down'></use>
                        </svg>
                      </span>
                    </button>
                    <ul className='custom-select__list' role='listbox' >
                      {LOCATIONS.map((el) =>
                        (
                          <li
                            key={el}
                            role='option'
                            tabIndex={0}
                            className='custom-select__item'
                            aria-selected={currentLocation === el}
                            onClick={locationChangeHandle}
                          >
                            {el}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className='custom-input'>
                    <label><span className='custom-input__label'>Пароль</span>
                      <span className='custom-input__wrapper'>
                        <input
                          onChange={fieldChangeHandle}
                          type='password'
                          name='password'
                          autoComplete='off'
                          required
                          minLength={6}
                          maxLength={12}
                        />
                      </span>
                    </label>
                  </div>
                  <div className='sign-up__radio'><span className='sign-up__label'>Пол</span>
                    <div className='custom-toggle-radio custom-toggle-radio--big'>
                      {GENDERS.map((el) => (
                        <div className='custom-toggle-radio__block' key={el}>
                          <label htmlFor={el}>
                            {el === UserGender.Male ?
                              (
                                <input
                                  type='radio'
                                  id={el}
                                  name='sex'
                                  value={el}
                                  required
                                  onChange={genderChangeHandle}
                                />
                              )
                              : (
                                <input
                                  type='radio'
                                  id={el}
                                  name='sex'
                                  value={el}
                                  onChange={genderChangeHandle}
                                />
                              )}
                            <span className='custom-toggle-radio__icon'></span>
                            <span className='custom-toggle-radio__label'>{el}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='sign-up__role'>
                  <h2 className='sign-up__legend'>Выберите роль</h2>
                  <div className='role-selector sign-up__role-selector'>
                    {TEXT_ROLES.map((el) => (
                      <div className='role-btn' key={el}>
                        <label>
                          {el === UserRoleText.Coach
                            ? (
                              <input
                                className='radio-visually-hidden'
                                type='radio'
                                name='role'
                                value={el}
                                id={el}
                                required
                                onChange={roleChangeHandle}
                              />
                            )
                            :
                            (
                              <input
                                className='radio-visually-hidden'
                                type='radio'
                                name='role'
                                value={el}
                                id={el}
                                onChange={roleChangeHandle}
                              />
                            )}
                          <span className='role-btn__icon'>
                            <svg width='12' height='13' aria-hidden='true'>
                              <use xlinkHref={el === UserRoleText.Coach ? '#icon-cup' : '#icon-weight'}></use>
                            </svg>
                          </span><span className='role-btn__btn'>{el}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='sign-up__checkbox'>
                  <label>
                    <input
                      type='checkbox'
                      value='user-agreement'
                      name='user-agreement'
                      onChange={handleAgreementChange}
                      required
                    />
                    <span className='sign-up__checkbox-icon'>
                      <svg width='9' height='6' aria-hidden='true'>
                        <use xlinkHref='#arrow-check'></use>
                      </svg>
                    </span><span className='sign-up__checkbox-label'>Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
                  </label>
                </div>
                <button
                  className='btn sign-up__button'
                  type='submit'
                >
                  Продолжить
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
}

export default RegisterPage;
