import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import UserCardPage from './user-card-page';
import { makeFakeWorkout, makeFakeUserFull, makeFakeUserCoach} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus } from '../../constant';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeWorkout = Array.from({length: 4}, () => makeFakeWorkout());
const fakeUserFull = makeFakeUserFull();
const fakeUserOther = makeFakeUserCoach();

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeUserFull, hasErrorLogin: false,
    userData: null, userFullInfo: fakeUserFull, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, existsEmail: false,
    users: fakeUserFull, userOther: fakeUserOther, isUserOtherLoading: false, countUsers: 0
  },
  DATA_WORKOUTS: {
    workouts: [],
    isLoadingCountAllWorkouts: false, userWorkouts: [], coachWorkouts: fakeWorkout,
    isWorkoutsDataLoading: false, isCoachWorkoutsLoading: false,
    isWorkoutLoading: false, workout: null,
  },
});
const history = createMemoryHistory();

describe('Component: UserCardPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <UserCardPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(fakeUserOther.name)).toBeInTheDocument();
    expect(screen.getByText(fakeUserOther.location)).toBeInTheDocument();
  });

});
