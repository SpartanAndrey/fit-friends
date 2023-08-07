import { AppRoute, AuthorizationStatus, UserRole } from '../../constant';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus, getLoggedUserData } from '../../store/user-process/user-selectors';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { redirectToRoute } from '../../store/action';
import { AuthData } from '../../types/auth-data';
import { loginAction } from '../../store/api-action';
import { validatePassword } from '../../utils/utils';

function LoginPage(): JSX.Element {

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getLoggedUserData);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      user?.role === UserRole.Coach ? dispatch(redirectToRoute(AppRoute.Main)) : dispatch(redirectToRoute(AppRoute.Main)); //тут поправить на нужный путь - личный кабинет тренера
    }
  });

  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  });

  const onSubmit = (data: AuthData) => {
    if (validatePassword(data.password)) {
      dispatch(loginAction(data));
      user?.role === UserRole.Coach ? dispatch(redirectToRoute(AppRoute.Main)) : dispatch(redirectToRoute(AppRoute.Main)); //тут поправить на нужный путь - личный кабинет тренера
    }
  };

  const fieldChangeHandle = (evt: ChangeEvent<HTMLInputElement | null>) => {
    const {name, value} = evt.target;
    setAuthData({...authData, [name]: value});
  };

  const submitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onSubmit({
      login: authData.email,
      password: authData.password,
    });
  };

  return(
    <div className="wrapper">
      <main>
        <div className="background-logo">
          <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
            <use xlinkHref="#logo-big"></use>
          </svg>
          <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
            <use xlinkHref="#icon-logotype"></use>
          </svg>
        </div>
        <div className="popup-form popup-form--sign-in">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Вход</h1>
              </div>
              <div className="popup-form__form">
                <form method="get" onSubmit={submitHandle}>
                  <div className="sign-in">
                    <div className="custom-input sign-in__input">
                      <label><span className="custom-input__label">E-mail</span>
                        <span className="custom-input__wrapper">
                          <input onChange={fieldChangeHandle} type="email" name="email" autoComplete="off" required/>
                        </span>
                      </label>
                    </div>
                    <div className="custom-input sign-in__input">
                      <label><span className="custom-input__label">Пароль</span>
                        <span className="custom-input__wrapper">
                          <input onChange={fieldChangeHandle} type="password" name="password" autoComplete="off" required/>
                        </span>
                      </label>
                    </div>
                    <button className="btn sign-in__button" type="submit">Продолжить</button>
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

export default LoginPage;
