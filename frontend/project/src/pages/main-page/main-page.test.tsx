import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import MainPage from './main-page';
import { makeFakeWorkout, makeFakeUserFull } from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {AuthorizationStatus } from '../../constant';
import { HelmetProvider } from 'react-helmet-async';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeWorkouts = Array.from({length: 5}, () => makeFakeWorkout());
const fakeUserFull = Array.from({length: 5}, () => makeFakeUserFull());
const fakeFriends = Array.from({length: 5}, () => makeFakeUserFull());

const store = mockStore({
  USER: {authStatus: AuthorizationStatus.Auth, loggedUser: fakeUserFull[1], 
    userFull: fakeUserFull, isLoading: false, isUserCatalogLoading: false, existsEmail: false,
    users: fakeUserFull, userOther: null, isUserOtherLoading: false },
  DATA_FRIENDS: {friends: fakeFriends, isFriendsListLoading: false },
  DATA_WORKOUTS: {workouts: fakeWorkouts,
    userWorkouts: fakeWorkouts, coachWorkouts: fakeWorkouts,
    isWorkoutsCatalogLoading: false, isCoachWorkoutsLoading: false, isWorkoutLoading: false, workout: null,
    },
});


const history = createMemoryHistory();
jest.mock('../../hooks/use-scroll-to-up/use-scroll-to-up', () => function useScrollToUp() {
  return (
    <div>fake useScrollToUp</div>
  );
});
describe('Component: MainPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MainPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('Специальные предложения')).toBeInTheDocument();
    expect(screen.getByTestId('for_you')).toBeInTheDocument();
    expect(screen.getByTestId('special')).toBeInTheDocument();
    expect(screen.getByTestId('popular')).toBeInTheDocument();
    expect(screen.getByTestId('look')).toBeInTheDocument();
  });

});