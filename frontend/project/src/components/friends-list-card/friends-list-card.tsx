import { useNavigate } from 'react-router-dom';
import { UserFull } from '../../types/user-full';
import { UserRole, AppRoute } from '../../constant';

type Props = {
  user: UserFull;
}

const FriendsListCard = ({ user }: Props): JSX.Element => {

  const isCoach = user.role === UserRole.Coach;

  const navigate = useNavigate();
  const routeChange = () =>{
    const path = `${AppRoute.Users}/${user.id}`;
    navigate(path);
  };

  return (
    <div className="thumbnail-friend">
      <div
        className={`thumbnail-friend__info thumbnail-friend__info--theme-${isCoach ? 'dark' : 'light'} `}
        onClick={routeChange}
      >
        <div className="thumbnail-friend__image-status">
          <div className="thumbnail-friend__image">
            <picture>
              <img src={user.avatar} width="78" height="78" alt=""/>
            </picture>
          </div>
        </div>
        <div className="thumbnail-friend__header">
          <h2 className="thumbnail-friend__name">{user.name}</h2>
          <div className="thumbnail-friend__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-friend__location-address">{user.location}</address>
          </div>
        </div>
        <ul className="thumbnail-friend__training-types-list">
          {user.workoutType && user.workoutType.map((el)=>
            (
              <li key={el}>
                <div className="hashtag thumbnail-friend__hashtag"><span>#{el}</span></div>
              </li>)
          )}
        </ul>
        {user.isReadyToTrain || user.isReadyToCoach &&
        <div className="thumbnail-friend__activity-bar">
          <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
          </div>
        </div>}
      </div>
      {isCoach &&
        <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-coach">
          <p className="thumbnail-friend__request-text">
            Запрос на&nbsp;персональную тренировку
          </p>
          <div className="thumbnail-friend__button-wrapper">
            <button
              className="btn btn--medium btn--dark-bg thumbnail-friend__button"
              type="button"
            >Принять
            </button>
            <button
              className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
              type="button"
            >Отклонить
            </button>
          </div>
        </div>}
      {!isCoach &&
        <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
          <p className="thumbnail-friend__request-text">
            Запрос на&nbsp;совместную тренировку
          </p>
          <div className="thumbnail-friend__button-wrapper">
            <button
              className="btn btn--medium btn--dark-bg thumbnail-friend__button"
              type="button"
            >Принять
            </button>
            <button
              className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
              type="button"
            >Отклонить
            </button>
          </div>
        </div>}
    </div>
  );
};

export default FriendsListCard;
