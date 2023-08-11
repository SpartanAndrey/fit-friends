import {NameSpace, AuthorizationStatus} from '../../constant';
import {State} from '../../types/state';
import { LoggedUserData } from '../../types/logged-user-data';
import { UserCoach } from '../../types/user-coach';
import { UserFull } from '../../types/user-full';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].userData.authStatus;
export const getLoggedUserData = (state: State): LoggedUserData | null => state[NameSpace.User].userData.loggedUser;
export const getEmailExistenceCheck = (state: State): boolean => state[NameSpace.User].userData.existsEmail;
export const getUserCoach = (state: State): UserCoach | null => state[NameSpace.User].userData.coachInfo;
export const getUser = (state: State): UserFull | null => state[NameSpace.User].userData.userInfo;
export const getUserLoadingStatus = (state: State): boolean => state[NameSpace.User].userData.isLoading;
export const getUsers = (state: State): UserFull[] => state[NameSpace.User].userData.users;
export const getUserCatalogLoading = (state: State): boolean => state[NameSpace.User].userData.isUserCatalogLoading;
