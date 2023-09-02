import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import MyWorkoutsPage from './my-workouts';
import { makeFakeWorkout} from '../../utils/mocks';

const mockStore = configureMockStore();
const fakeWorkouts = Array.from({length: 5}, () => makeFakeWorkout());

const store = mockStore({
  DATA_WORKOUTS: {workouts: fakeWorkouts, userWorkouts: [], coachWorkouts: [],
    isWorkoutsCatalogLoading: false, isCoachWorkoutsLoading: false,
    isWorkoutLoading: false, workout: null},
});

describe('Component: MyWorkoutsPage', () => {
  it('should render "MyWorkoutsPage"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MyWorkoutsPage
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();

  });
});
