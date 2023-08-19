import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, UserRole } from '../../constant';

type NotAuthRouteProps = {
  restrictedFor: AuthorizationStatus;
  userRole?: string;
  children: JSX.Element;
}

const NotAuthRoute = ({ children, restrictedFor, userRole}: NotAuthRouteProps): JSX.Element => {

  if (AuthorizationStatus.Auth === restrictedFor && userRole && userRole === UserRole.Coach)
  {
    return <Navigate to={AppRoute.PersonalAccountCoach} />;
  }
  if (AuthorizationStatus.Auth === restrictedFor && userRole && userRole === UserRole.User)
  {
    return <Navigate to={AppRoute.Main} />;

  }
  return children;
};

export default NotAuthRoute;
