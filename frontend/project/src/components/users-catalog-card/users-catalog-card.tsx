import { Link } from 'react-router-dom';
import { AppRoute } from '../../constant';
import { UserFull } from '../../types/user-full';

type Props = {
  user: UserFull;
}

function UsersCatalogCard({user}: Props): JSX.Element {

  const path = `${AppRoute.Users}/${user.id}`;

  return(
    <li className="users-catalog__item">
      <div className={`thumbnail-user thumbnail-user--role-${user.role}`}>
        <div className="thumbnail-user__image">
          <picture>
            <source type="image/webp" srcSet={user.avatar}/>
            <img src={user.avatar} srcSet={user.avatar} width="82" height="82" alt=""/>
          </picture>
        </div>
        <div className={`thumbnail-user__top-status thumbnail-user__top-status--role-${user.role}`}>
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-crown"></use>
          </svg>
        </div>
        <div className="thumbnail-user__header">
          <h3 className="thumbnail-user__name">{user.name}</h3>
          <div className="thumbnail-user__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-user__location-address">{user.location}</address>
          </div>
        </div>
        <ul className="thumbnail-user__hashtags-list">
          {user.workoutType.map((type) => (
            <li className="thumbnail-user__hashtags-item" key={type}>
              <div className="hashtag thumbnail-user__hashtag"><span>#{type}</span></div>
            </li>
          ))}
        </ul>
        <Link className="btn btn--medium thumbnail-user__button" to={path}>Подробнее</Link>
      </div>
    </li>
  );
}

export default UsersCatalogCard;
