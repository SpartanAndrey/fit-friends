import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import {AuthorizationStatus, AppRoute } from '../../constant';
import App from './app';
import {makeFakeUserFull, makeFakeWorkout, makeFakeReview, makeFakeUserCoach} from '../../utils/mocks';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUserFull = makeFakeUserFull();
const fakeUserOther = makeFakeUserCoach();
const fakeUserCatalog = Array.from({length: 5}, () => makeFakeUserFull());
const fakeReviews = Array.from({length: 5}, () => makeFakeReview());
const fakeWorkouts = Array.from({length: 5}, () => makeFakeWorkout());

const store = mockStore({
  USER: {authStatus: AuthorizationStatus.Auth, loggedUser: fakeUserFull, 
    userFull: fakeUserFull, isLoading: false, isUserCatalogLoading: false, existsEmail: false,
    users: fakeUserCatalog, userOther: fakeUserOther, isUserOtherLoading: false},
  DATA_FRIENDS: {friends: [], countFiends: 0, isCountDataLoading: false,
    isFriendsDataLoading: false, hasError: false, hasErrorPost: false,
    isFriendLoadDelete: false, isFriendLoadPost: false},
  DATA_WORKOUTS: {workouts: fakeWorkouts,
    userWorkouts: [], coachWorkouts: [],
    isWorkoutsCatalogLoading: false, isCoachWorkoutsLoading: false,
    isWorkoutLoading: false, workout: fakeWorkouts[0]},
  DATA_REVIEW: {creviews: fakeReviews, isReviewsLoading: false},
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);
jest.mock('../../hooks/use-scroll-to-up/use-scroll-to-up', () => function useScrollToUp() {
  return (
    <div>fake useScrollToUp</div>
  );
});
describe('Application Routing', () => {
  it('should render "WelcomeScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Intro);

    render(fakeApp);

    expect(screen.getByText(/Регистрация/i)).toBeInTheDocument();
    expect(screen.getByText(/Вход/i)).toBeInTheDocument();
  });

  it(`should render "Workout" when user navigate to ${AppRoute.WorkoutCard}/${fakeWorkouts[0].id}`, () => {
    history.push(`${AppRoute.WorkoutCard}/${fakeWorkouts[0].id}`);

    render(fakeApp);
    const name = fakeWorkouts[0].title ? fakeWorkouts[0].title : ' ';
    expect(screen.getByText(/Видео/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(name)).toHaveAttribute('name', 'nameWorkout');
  });

  it(`should render "Card user" when user navigate to ${AppRoute.Users}/${fakeUserOther.id}`, () => {
    history.push(`${AppRoute.Users}/${fakeUserOther.id}`);

    render(fakeApp);

    expect(screen.getByText(fakeUserOther.name)).toBeInTheDocument();
    expect(screen.getByText(fakeUserOther.location)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
