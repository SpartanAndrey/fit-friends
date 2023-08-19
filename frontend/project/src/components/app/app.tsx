import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, UserRole } from '../../constant';
import IntroPage from '../../pages/intro-page/intro-page';
import RegisterPage from '../../pages/register-page/register-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import QuestionnaireCoachPage from '../../pages/questionnaire-coach-page/questionnaire-coach-page';
import QuestionnaireUserPage from '../../pages/questionnaire-user-page/questionnaire-user-page';
import PersonalAccountCoachPage from '../../pages/personal-account-coach-page/personal-account-coach-page';
import UsersCatalogPage from '../../pages/users-catalog-page/users-catalog-page';
import UserCardPage from '../../pages/user-card-page/user-card-page';
import WorkoutsCatalogPage from '../../pages/workouts-catalog-page/workouts-catalog-page';
import PrivateRoute from '../private-route/private-route';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import LoadingSlider from '../loading-slider/loading-slider';
import NotAuthRoute from '../not-auth-route/not-auth-route';
import MainPage from '../../pages/main-page/main-page';
import PersonalAccountUserPage from '../../pages/personal-account-user-page/personal-account-user-page';
import MyWorkoutsPage from '../my-workouts/my-workouts';
import CreateWorkoutForm from '../create-workout-form/create-workout-form';
import FriendsListCoachPage from '../../pages/friends-list-coach-page/friends-list-coach-page';
import FriendsListUserPage from '../../pages/friends-list-user-page/friends-list-user-page';
import WorkoutCardPage from '../../pages/workout-card-page/workout-card-page';
import {
  getAuthorizationStatus,
  getLoggedUserData,
  getUser,
  getUserLoadingStatus,
} from '../../store/user-process/user-selectors';
import {
  fetchCoachWorkoutsAction,
  fetchUserAction,
  fetchUserCatalogAction,
  fetchUserFriendsAction,
  fetchWorkoutCatalogAction,
} from '../../store/api-action';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../broswer-history';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getLoggedUserData);
  const userFullInfo = useAppSelector(getUser);
  const isUserLoading = useAppSelector(getUserLoadingStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth && userData) {
      dispatch(fetchUserAction(String(userData.id)));
    }
  }, [authorizationStatus, dispatch, userData]);

  useEffect(() => {
    if (userData?.role === UserRole.User) {
      dispatch(fetchWorkoutCatalogAction());
      dispatch(fetchUserCatalogAction());
      dispatch(fetchUserFriendsAction());
    }
    if (userData?.role === UserRole.Coach && userData.id) {
      dispatch(fetchCoachWorkoutsAction());
      dispatch(fetchUserFriendsAction());
    }
  }, [dispatch, userData, userData?.id, userData?.role, userFullInfo]);

  if (isUserLoading) {
    return <LoadingSlider />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Intro} element={<IntroPage />} />
        <Route path={AppRoute.Register} element={<RegisterPage />} />
        <Route
          path={AppRoute.QuestionnaireCoach}
          element={<QuestionnaireCoachPage />}
        />
        <Route
          path={AppRoute.QuestionnaireUser}
          element={<QuestionnaireUserPage />}
        />
        <Route
          path={AppRoute.Login}
          element={
            <NotAuthRoute
              restrictedFor={authorizationStatus}
              userRole={userData?.role}
            >
              <LoginPage />
            </NotAuthRoute>
          }
        />
        <Route
          path={AppRoute.Main}
          element={
            <PrivateRoute
              restrictedFor={authorizationStatus}
              redirectTo={AppRoute.Login}
              verifyRole={UserRole.User === userData?.role}
            >
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.PersonalAccountCoach}
          element={
            <PrivateRoute
              restrictedFor={authorizationStatus}
              redirectTo={AppRoute.Login}
              verifyRole={UserRole.Coach === userData?.role}
            >
              <PersonalAccountCoachPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.PersonalAccountUser}
          element={
            <PrivateRoute
              restrictedFor={authorizationStatus}
              redirectTo={AppRoute.Login}
              verifyRole={UserRole.User === userData?.role}
            >
              <PersonalAccountUserPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Users}
          element={
            <PrivateRoute
              restrictedFor={authorizationStatus}
              redirectTo={AppRoute.Login}
              verifyRole={UserRole.User === userData?.role}
            >
              <UsersCatalogPage />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.PersonalAccountCoach}/workouts`}
          element={
            <PrivateRoute
              restrictedFor={authorizationStatus}
              redirectTo={AppRoute.Login}
              verifyRole={UserRole.Coach === userData?.role}
            >
              <MyWorkoutsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.PersonalAccountCoach}/workouts/create`}
          element={
            <PrivateRoute
              restrictedFor={authorizationStatus}
              redirectTo={AppRoute.Login}
              verifyRole={UserRole.Coach === userData?.role}
            >
              <CreateWorkoutForm />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.PersonalAccountCoach}/friends`}
          element={
            <PrivateRoute
              restrictedFor={authorizationStatus}
              redirectTo={AppRoute.Login}
              verifyRole={UserRole.Coach === userData?.role}
            >
              <FriendsListCoachPage />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.PersonalAccountUser}/friends`}
          element={
            <PrivateRoute
              restrictedFor={authorizationStatus}
              redirectTo={AppRoute.Login}
              verifyRole={UserRole.User === userData?.role}
            >
              <FriendsListUserPage />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.WorkoutsCatalog}`}
          element={
            <PrivateRoute
              restrictedFor={authorizationStatus}
              redirectTo={AppRoute.Login}
              verifyRole={UserRole.User === userData?.role}
            >
              <WorkoutsCatalogPage />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.WorkoutCard}`}
          element={
            <PrivateRoute
              restrictedFor={authorizationStatus}
              redirectTo={AppRoute.Login}
              verifyRole
            >
              <WorkoutCardPage />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.UserCard}`}
          element={
            <PrivateRoute
              restrictedFor={authorizationStatus}
              redirectTo={AppRoute.Login}
              verifyRole
            >
              <UserCardPage />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
