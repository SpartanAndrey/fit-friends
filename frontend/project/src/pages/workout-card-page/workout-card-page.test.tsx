import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import WorkoutCardPage from './workout-card-page';
import { makeFakeWorkout, makeFakeUserFull, makeFakeReview } from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus } from '../../constant';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeWorkout = makeFakeWorkout();
const fakeUserFull = makeFakeUserFull();
const fakeReviews = Array.from({length: 5}, () => makeFakeReview());

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeUserFull, hasErrorLogin: false,
    userInfo: fakeUserFull, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, existsEmail: false,
    users: fakeUserFull, userOther: null, isUserOtherLoading: false, countUsers: 0},
  DATA_WORKOUTS: {workouts: [],
    userWorkouts: [], coachWorkouts: [],
    isWorkoutsDataLoading: false, isCoachWorkoutsLoading: false,
    isWorkoutLoading: false, training: fakeWorkout,
    isLoadingPostWorkout: false},
  DATA_REVIEWS: {reviews: fakeReviews, isReviewsDataLoading: false},
});
const name = fakeWorkout.title ? fakeWorkout.title : ' ';
const history = createMemoryHistory();

describe('Component: WorkoutCardPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <WorkoutCardPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByDisplayValue(name)).toHaveAttribute('name', 'nameWorkout');
  });

});
