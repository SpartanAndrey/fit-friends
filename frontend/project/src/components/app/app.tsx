import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../constant';
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


function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Intro}
          element={<IntroPage />}
        />
        <Route
          path={AppRoute.Register}
          element={<RegisterPage />}
        />
        <Route
          path={AppRoute.QuestionnaireCoach}
          element={<QuestionnaireCoachPage />}
        />
        <Route
          path={AppRoute.QuestionnaireUser}
          element={<QuestionnaireUserPage/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.PersonalAccountCoach}
          element={<PersonalAccountCoachPage />}
        />
        <Route
          path={AppRoute.UsersCatalog}
          element={<UsersCatalogPage />}
        />
        <Route
          path={AppRoute.UserCard}
          element={<UserCardPage />}
        />
        <Route
          path={AppRoute.WorkoutsCatalog}
          element={<WorkoutsCatalogPage />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
