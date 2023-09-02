import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import PersonalAccountUserPage from './personal-account-user-page';
import { makeFakeWorkout, makeFakeUserFull } from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {AppRoute, AuthorizationStatus } from '../../constant';
import { HelmetProvider } from 'react-helmet-async';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeWorkouts = Array.from({length: 5}, () => makeFakeWorkout());
const fakeUserFull = Array.from({length: 5}, () => makeFakeUserFull());
const fakeFriends = Array.from({length: 5}, () => makeFakeUserFull());

const store = mockStore({
  USER: {authStatus: AuthorizationStatus.Auth, loggedUser: fakeUserFull[1],
    userFull: fakeUserFull[1], isLoading: false, isUserCatalogLoading: false, existsEmail: false,
    users: fakeUserFull, userOther: null, isUserOtherLoading: false, countUsers: 0},
  DATA_FRIENDS: {friends: fakeFriends,
    isFriendsListLoading: false},
  DATA_WORKOUTS: {workouts: fakeWorkouts,
    userWorkouts: fakeWorkouts, coachWorkouts: fakeWorkouts,
    isWorkoutCatalogLoading: false, isCoachWorkoutsLoading: false,
    isWorkoutLoading: false, workout: null,
    },
});


const history = createMemoryHistory();

describe('Component: PersonalAccountUserPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <PersonalAccountUserPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
    const workoutLink: HTMLAnchorElement = screen.getByTestId('workouts');
    expect(workoutLink.href).toContain(`${AppRoute.PersonalAccountUser}/workouts`);

    const friendLink: HTMLAnchorElement = screen.getByTestId('friends');
    expect(friendLink.href).toContain(`${AppRoute.PersonalAccountUser}/friends`);

  });

});
