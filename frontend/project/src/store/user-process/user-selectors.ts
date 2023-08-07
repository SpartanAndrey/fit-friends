import {NameSpace, AuthorizationStatus} from '../../constant';
import {State} from '../../types/state';
import { LoggedUserData } from '../../types/logged-user-data';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].userData.authStatus;
export const getLoggedUserData = (state: State): LoggedUserData | null => state[NameSpace.User].userData.loggedUser;
export const getEmailExistenceCheck = (state: State): boolean => state[NameSpace.User].userData.existsEmail;