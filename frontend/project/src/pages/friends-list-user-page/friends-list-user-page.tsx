import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import { getFriends, getFriendsListLoading, getUser } from '../../store/user-process/user-selectors';
import { DEFAULT_USERS_CATALOG_NUMBER, UserRole } from '../../constant';
import { useEffect, useState } from 'react';
import { UserQuery } from '../../types/query';
import { fetchUserFriendsAction } from '../../store/api-action';
import LoadingSlider from '../../components/loading-slider/loading-slider';
import NotFoundPage from '../not-found-page/not-found-page';
import FriendsListCard from '../../components/friends-list-card/friends-list-card';

function FriendsListUserPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const friends = useAppSelector(getFriends);
  const isFriendsListLoading = useAppSelector(getFriendsListLoading);
  const friendsNumber = friends ? friends.length : 0;
  const pagesNumber = Math.ceil(friendsNumber / DEFAULT_USERS_CATALOG_NUMBER);

  if (!user) {
    return <NotFoundPage />;
  }

  const [query, setQuery] = useState<UserQuery>({userId: user.id, limit: DEFAULT_USERS_CATALOG_NUMBER, page: 1});
  useEffect(()=>{
    dispatch(fetchUserFriendsAction(query));
  }, [dispatch, query]);

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (isFriendsListLoading) {
    <LoadingSlider/>;
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <button
                className="btn-flat friends-list__back"
                type="button"
                onClick={() => navigate(-1)}
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
              </div>
              <ul className="friends-list__list" data-testid="list">
                {friends && friends.map((el) =>
                  (
                    <li className="friends-list__item" key={el.id}>
                      <FriendsListCard user={el} />
                    </li>)
                )}
              </ul>
              <div className="show-more friends-list__show-more">
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
        </section>
      </main>
    </div>
  );
}

export default FriendsListUserPage;
