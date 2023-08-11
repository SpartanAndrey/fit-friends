import {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { getUserCatalogLoading, getUsers } from '../../store/user-process/user-selectors';
import { DEFAULT_USERS_CATALOG_NUMBER, LEVELS, LOCATIONS, ROLES, UserLevel, UserLocation, UserRole, VISIBLE_WORKOUT_TYPES_NUMBER, WORKOUT_TYPES, WorkoutType } from '../../constant';
import LoadingSlider from '../../components/loading-slider/loading-slider';
import { UserQuery } from '../../types/query';
import { fetchUserCatalogAction } from '../../store/api-action';
import Header from '../../components/header/header';
import UsersCatalogCard from '../../components/users-catalog-card/users-catalog-card';

function UsersCatalogPage() {
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };
    
      const dispatch = useAppDispatch();
      const navigate = useNavigate();
    
      const isUserDataLoading = useAppSelector(getUserCatalogLoading);
      const users = useAppSelector(getUsers);
      const usersNumber = users ? users.length : 0;
      const pagesNumber = Math.ceil(usersNumber / DEFAULT_USERS_CATALOG_NUMBER);
    
      if (isUserDataLoading) {
        <LoadingSlider/>;
      }
      if (!users) {
        return null;
      }


  const [visibleWorkoutTypes, setVisibleWorkoutTypes] = useState<string[]>(WORKOUT_TYPES.slice(0, VISIBLE_WORKOUT_TYPES_NUMBER));
  
  const showMoreClickHandle = () => {
    setVisibleWorkoutTypes(WORKOUT_TYPES);
  };

  const [query, setQuery] = useState<UserQuery>({limit: DEFAULT_USERS_CATALOG_NUMBER, page: 1});

  const filterChangeHandle = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value, name} = evt.target;
    if (name === 'workoutType') {
      const isChecked = !!(query && query?.workoutType && query?.workoutType.find((el) => el === value as WorkoutType));
      if (isChecked && query.workoutType) {
        const currentArr = query.workoutType.filter((el) => el !== value);
        evt.target.removeAttribute('checked');
        currentArr.length === 0 ? setQuery({...query, workoutType: undefined}) : setQuery({...query, workoutType: currentArr});
      }
      else {
        const currentArr = query && query.workoutType ? query.workoutType : [];
        setQuery({...query, workoutType: [...currentArr, value as WorkoutType]});
        evt.target.setAttribute('checked', 'true');
      }
    }
    if (name === 'location') {
      const isChecked = !!(query && query?.location && query?.location.find((el) => el === value as UserLocation));
      if (isChecked && query.location) {
        const currentArr = query.location.filter((el) => el !== value);
        evt.target.removeAttribute('checked');
        currentArr.length === 0 ? setQuery({...query, location: undefined}) : setQuery({...query, location: currentArr});
      }
      else {
        const currentArr = query && query.location ? query.location : [];
        setQuery({...query, location: [...currentArr, value as UserLocation]});
        evt.target.setAttribute('checked', 'true');
      }
    }
    if (name === 'level') {
      setQuery({...query, level: value as UserLevel});
      evt.target.setAttribute('checked', 'true');
    }
    if (name === 'role') {
      setQuery({...query, role: value as UserRole});
      evt.target.setAttribute('checked', 'true');
    }

  };

  useEffect(()=>{
    dispatch(fetchUserCatalogAction(query));
  }, [dispatch, query]);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог пользователей</h1>
              <div className="user-catalog-form">
                <h2 className="visually-hidden">Каталог пользователя</h2>
                <div className="user-catalog-form__wrapper">
                  <button
                    className="btn-flat btn-flat--underlined user-catalog-form__btnback"
                    type="button"
                    onClick={() => {dispatch(fetchUserCatalogAction()); navigate(-1);}}
                  >
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg><span>Назад</span>
                  </button>
                  <h3 className="user-catalog-form__title">Фильтры</h3>
                  <form className="user-catalog-form__form">
                    <div className="user-catalog-form__block user-catalog-form__block--location">
                      <h4 className="user-catalog-form__block-title">Локация, станция метро</h4>
                      <ul className="user-catalog-form__check-list">
                        {LOCATIONS.map((el)=>
                          (
                            <li className="user-catalog-form__check-list-item" key={el}>
                              <div className="custom-toggle custom-toggle--checkbox">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="location"
                                    value={el}
                                    id={el}
                                    onChange={filterChangeHandle}
                                  />
                                  <span className="custom-toggle__icon">
                                    <svg width="9" height="6" aria-hidden="true">
                                      <use xlinkHref="#arrow-check"></use>
                                    </svg>
                                  </span><span className="custom-toggle__label">{el}</span>
                                </label>
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="user-catalog-form__block user-catalog-form__block--spezialization">
                      <h4 className="user-catalog-form__block-title">Специализация</h4>
                      <ul className="user-catalog-form__check-list">
                        {visibleWorkoutTypes.map((el)=>
                          (
                            <li className="user-catalog-form__check-list-item" key={el}>
                              <div className="custom-toggle custom-toggle--checkbox">
                                <label>
                                  <input
                                    className="visually-hidden"
                                    type="checkbox"
                                    name="workoutType"
                                    value={el}
                                    id={el}
                                    onChange={filterChangeHandle}
                                  />
                                  <span className="custom-toggle__icon">
                                    <svg width="9" height="6" aria-hidden="true">
                                      <use xlinkHref="#arrow-check"></use>
                                    </svg>
                                  </span><span className="custom-toggle__label">{el}</span>
                                </label>
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                      {visibleWorkoutTypes.length === VISIBLE_WORKOUT_TYPES_NUMBER &&
                      <button
                        className="btn-show-more user-catalog-form__btn-show"
                        type="button"
                        onClick={showMoreClickHandle}
                      ><span>Посмотреть все</span>
                        <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </button>}
                    </div>
                    <div className="user-catalog-form__block user-catalog-form__block--level">
                      <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
                      <div className="custom-toggle-radio">
                        {LEVELS.map((el)=>
                          (
                            <div className="custom-toggle-radio__block" key={el}>
                              <label>
                                <input
                                  type="radio"
                                  name="level"
                                  id={el}
                                  value={el}
                                  onChange={filterChangeHandle}
                                />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">{el}</span>
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="user-catalog-form__block">
                      <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
                      <div className="btn-radio-sort">
                        {ROLES.map((el)=>
                          (
                            <label key={el}>
                              <input
                                type="radio"
                                name="role"
                                id={el}
                                value={el}
                                onChange={filterChangeHandle}
                              />
                              <span className="btn-radio-sort__label">{el === UserRole.User ? 'Пользователи' : 'Тренеры'}</span>
                            </label>
                          )
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="inner-page__content">
                <div className="users-catalog">
                  <ul className="users-catalog__list">
                    {users.map((el)=>
                      (
                        <li className="users-catalog__item" key={el.id}>
                          <UsersCatalogCard user={el} />
                        </li>)
                    )}

                  </ul>
                  <div className="show-more users-catalog__show-more">
                    {pagesNumber !== query.page &&
                  <button
                    className="btn show-more__button show-more__button--more"
                    type="button"
                    onClick={() => setQuery({...query, page: query.page ? query.page + 1 : 1})}
                  >Показать еще
                  </button> }
                    {pagesNumber === query.page && pagesNumber !== 1 &&
                  <button className="btn show-more__button" type="button" onClick={scrollToTop}>Вернуться в начало</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UsersCatalogPage;
