import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import WorkoutsCatalogPage from './workouts-catalog-page';
import { makeFakeWorkout, makeFakeUserFull} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus } from '../../constant';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeWorkouts = Array.from({length: 5}, () => makeFakeWorkout());
const fakeUserFull = Array.from({length: 5}, () => makeFakeUserFull());

const store = mockStore({
  USER: {
    authStatus: AuthorizationStatus.Auth, loggedUser: fakeUserFull[1],
    userInfo: fakeUserFull, isLoading: false, isUserCatalogLoading: false, existsEmail: false,
    },
  DATA_WORKOUTS: {
    workouts: fakeWorkouts,
    isWorkoutDataLoading: false,
   },
});
const name = fakeWorkouts[0].title ? fakeWorkouts[0].title : ' ';

const history = createMemoryHistory();
jest.mock('../../hooks/use-scroll-to-up/use-scroll-to-up', () => function useScrollToUp() {
  return (
    <div>fake useScrollToUp</div>
  );
});
describe('Component: WorkoutsCatalogPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <WorkoutsCatalogPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByTestId('workouts')).toBeInTheDocument();
  });

});
