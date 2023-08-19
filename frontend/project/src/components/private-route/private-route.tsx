import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constant';


type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
  verifyRole: boolean;
}

const PrivateRoute = ({ children, restrictedFor, redirectTo, verifyRole}: PrivateRouteProps): JSX.Element =>
  AuthorizationStatus.NoAuth !== restrictedFor && verifyRole ? children : <Navigate to={redirectTo} />;
  
export default PrivateRoute;
