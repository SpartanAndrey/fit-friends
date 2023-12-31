import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUser, getUserLoadingStatus, getUserOther } from '../../store/user-process/user-selectors';
import { useEffect, useState } from 'react';
import LoadingSlider from '../../components/loading-slider/loading-slider';
import NotFoundPage from '../not-found-page/not-found-page';
import { addFriendAction, fetchUserAction, fetchUserOtherAction, removeFriendAction } from '../../store/api-action';
import Header from '../../components/header/header';
import PopupMap from '../../components/popup-map/popup-map';
import PopupWindow from '../../components/popup-window/popup-window';

function UserCardPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const currentUserId = params.id;

  const user = useAppSelector(getUser);
  const userOther = useAppSelector(getUserOther);
  const isUserLoading = useAppSelector(getUserLoadingStatus);

  if (!userOther) {
    return <NotFoundPage />;
  }

  if (isUserLoading) {
    <LoadingSlider/>;
  }

  useEffect(() => {
    if (currentUserId && user) {
      dispatch(fetchUserOtherAction(currentUserId));
      dispatch(fetchUserAction(user.id));
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
                <section className="user-card">
                  <h1 className="visually-hidden">Карточка пользователя</h1>
                  <div className="user-card__wrapper">
                    <div className="user-card__content">
                      <div className="user-card__head">
                        <h2 className="user-card__title">{userOther.name}</h2>
                      </div>
                      <div className="user-card__label">
                        <Link to='/' onClick={(evt)=> {evt.preventDefault(); setShowModalMap(!showModalMap);}}><svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-location"></use>
                        </svg><span>{userOther.location}</span></Link>
                        {showModalMap &&
                            <PopupWindow handleClose={togglePopupMap}>
                              <PopupMap userName={userOther.name} location={userOther.location} handleClose={togglePopupMap} />
                            </PopupWindow>}
                      </div>
                      {userOther.isReadyToTrain && <div className="user-card__status"><span>Готов к тренировке</span></div>}
                      {!userOther.isReadyToTrain && <div className="user-card-coach-2__status user-card-coach-2__status--check"><span>е готов тренироваться</span></div>}
                      <div className="user-card__text">
                        {userOther.description}
                      </div>
                      <ul className="user-card__hashtag-list">
                        {userOther.workoutType.map((type) => (
                          <li className="user-card__hashtag-item">
                            <div className="hashtag"><span>#{type}</span></div>
                          </li>
                        ))}
                      </ul>
                      {user && !user.friends?.includes(userOther.id) && <button className="btn user-card__btn" type="button" onClick={addFriendHandle}>Добавить в друзья</button>}
                      {user && user.friends?.includes(userOther.id) && <button className="btn user-card__btn" type="button" onClick={deleteFriendHandle}>Удалить из друзей</button>}
                    </div>
                    <div className="user-card__gallary">
                      <ul className="user-card__gallary-list">
                        <li className="user-card__gallary-item"><img src="img/content/user-card-photo1.jpg" srcSet="img/content/user-card-photo1@2x.jpg 2x" width="334" height="573" alt="photo1" />
                        </li>
                        <li className="user-card__gallary-item"><img src="img/content/user-card-photo2.jpg" srcSet="img/content/user-card-photo2@2x.jpg 2x" width="334" height="573" alt="photo2" />
                        </li>
                      </ul>
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

export default UserCardPage;
