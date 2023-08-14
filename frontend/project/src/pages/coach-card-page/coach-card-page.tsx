import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUser, getUserLoadingStatus, getUserOther } from '../../store/user-process/user-selectors';
import { useEffect, useState } from 'react';
import LoadingSlider from '../../components/loading-slider/loading-slider';
import NotFoundPage from '../not-found-page/not-found-page';
import { addFriendAction, createRequestWorkoutAction, fetchCoachWorkoutsAction, fetchUserAction, fetchUserOtherAction, removeFriendAction } from '../../store/api-action';
import Header from '../../components/header/header';
import PopupMap from '../../components/popup-map/popup-map';
import PopupWindow from '../../components/popup-window/popup-window';
import { getCoachWorkouts, getCoachWorkoutsLoadingStatus } from '../../store/workout-process/workout-selectors';
import WorkoutsCatalogCard from '../../components/workouts-catalog-card/workouts-catalog-card';

function CoachCardPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const currentUserId = params.id;

  const user = useAppSelector(getUser);
  const userOther = useAppSelector(getUserOther);
  const coachWorkouts = useAppSelector(getCoachWorkouts);
  const isCoachWorkoutsLoading = useAppSelector(getCoachWorkoutsLoadingStatus);

  if (!userOther) {
    return <NotFoundPage />;
  }

  if (isCoachWorkoutsLoading) {
    <LoadingSlider/>;
  }

  useEffect(() => {
    if (currentUserId && user) {
      dispatch(fetchUserOtherAction(currentUserId));
      dispatch(fetchUserAction(user.id));
      dispatch(fetchCoachWorkoutsAction({coachId: currentUserId}))
    }
  }, [dispatch, currentUserId]);


  const addFriendHandle = () => {
    if(currentUserId && user) {
      dispatch(addFriendAction({userId: user.id, friendId: currentUserId}));
      dispatch(fetchUserOtherAction(currentUserId));
      dispatch(fetchUserAction(user.id));
    }
  };

  const deleteFriendHandle = () => {
    if(currentUserId && user) {
      dispatch(removeFriendAction({userId: user.id, friendId: currentUserId}));
      dispatch(fetchUserOtherAction(currentUserId));
      dispatch(fetchUserAction(user.id));
    }
  };

  const requestForWorkoutHandle = () => {
    if(currentUserId && user) {
      dispatch(createRequestWorkoutAction({ userId: userOther.id }));
    }
  };

  const [showModalMap, setShowModalMap] = useState(false);
  
  const togglePopupMap = () => {
    setShowModalMap(!showModalMap);
  };

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button className="btn-flat inner-page__back" type="button" onClick={() => navigate(-1)}>
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="inner-page__content">
                <section className="user-card-coach">
                  <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
                  <div className="user-card-coach__wrapper">
                    <div className="user-card-coach__card">
                      <div className="user-card-coach__content">
                        <div className="user-card-coach__head">
                          <h2 className="user-card-coach__title">{userOther.name}</h2>
                        </div>
                        <div className="user-card-coach__label">
                        <Link to='/' onClick={(evt)=> {evt.preventDefault(); setShowModalMap(!showModalMap);}}><svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-location"></use>
                        </svg><span>{userOther.location}</span></Link>
                        {showModalMap &&
                            <PopupWindow handleClose={togglePopupMap}>
                              <PopupMap userName={userOther.name} location={userOther.location} handleClose={togglePopupMap} />
                            </PopupWindow>}
                        </div>
                        <div className="user-card-coach__status-container">
                          <div className="user-card-coach__status user-card-coach__status--tag">
                            <svg className="user-card-coach__icon-cup" width="12" height="13" aria-hidden="true">
                              <use xlinkHref="#icon-cup"></use>
                            </svg><span>Тренер</span>
                          </div>
                          {userOther.isReadyToCoach && <div className="user-card-coach__status user-card-coach__status--check"><span>Готов тренировать</span></div>}
                          {!userOther.isReadyToCoach && <div className="user-card-coach-2__status user-card-coach-2__status--check"><span>Не готов тренировать</span></div>}
                        </div>
                        <div className="user-card-coach__text">
                          {userOther.description}
                        </div>
                        <button className="btn-flat user-card-coach__sertificate" type="button">
                          <svg width="12" height="13" aria-hidden="true">
                            <use xlinkHref="#icon-teacher"></use>
                          </svg><span>Посмотреть сертификаты</span>
                        </button>
                        <ul className="user-card-coach__hashtag-list">
                          {userOther.workoutType.map((type) => (
                            <li className="user-card-coach__hashtag-item">
                              <div className="hashtag"><span>#{type}</span></div>
                            </li>
                          ))}
                        </ul>
                        {user && !user.friends?.includes(userOther.id) && <button className="btn user-card-coach__btn" type="button" onClick={addFriendHandle}>Добавить в друзья</button>}
                        {user && user.friends?.includes(userOther.id) && <button className="btn user-card-coach__btn" type="button" onClick={deleteFriendHandle}>Удалить из друзей</button>}
                      </div>
                      <div className="user-card-coach__gallary">
                        <ul className="user-card-coach__gallary-list">
                          <li className="user-card-coach__gallary-item"><img src="img/content/user-coach-photo1.jpg" srcSet="img/content/user-coach-photo1@2x.jpg 2x" width="334" height="573" alt="photo1" />
                          </li>
                          <li className="user-card-coach__gallary-item"><img src="img/content/user-coach-photo2.jpg" srcSet="img/content/user-coach-photo2@2x.jpg 2x" width="334" height="573" alt="photo2" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="user-card-coach__training">
                      <div className="user-card-coach__training-head">
                        <h2 className="user-card-coach__training-title">Тренировки</h2>
                        <div className="user-card-coach__training-bts">
                          <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="back">
                            <svg width="14" height="10" aria-hidden="true">
                              <use xlinkHref="#arrow-left"></use>
                            </svg>
                          </button>
                          <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="next">
                            <svg width="14" height="10" aria-hidden="true">
                              <use xlinkHref="#arrow-right"></use>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <ul className="user-card-coach__training-list">
                        {
                          coachWorkouts.map((el)=>
                            (
                              <div className="thumbnail-training" key={el.id}>
                                <WorkoutsCatalogCard workout={el}/>
                              </div>
                            )
                          )
                        }
                      </ul>
                      <form className="user-card-coach__training-form">
                      {user && <button className="btn user-card-coach__btn-training" type="button" onClick={requestForWorkoutHandle}>Хочу персональную тренировку</button>}
                        <div className="user-card-coach__training-check">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="user-agreement-1" name="user-agreement" checked /><span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CoachCardPage;
