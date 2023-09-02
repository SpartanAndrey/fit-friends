import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import WorkoutsCatalogCard from './workouts-catalog-card';
import { makeFakeWorkout} from '../../utils/mocks';

const mockStore = configureMockStore();
const fakeWorkout = makeFakeWorkout();

const store = mockStore({
  DATA_WORKOUTS: {workouts: [fakeWorkout], userWorkouts: [], coachWorkouts: [],
    isWorkoutsCatalogLoading: false, isCoachWorkoutsLoading: false,
    isWorkoutLoading: false, workout: null},
});

describe('Component: WorkoutsCatalogCard', () => {
  it('should render "WorkoutsCatalogCard"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <WorkoutsCatalogCard
              workout={fakeWorkout}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeWorkout.type ? `#${fakeWorkout.type}` : '')).toBeInTheDocument();
    expect(screen.getByText(fakeWorkout.title ? fakeWorkout.title : '')).toBeInTheDocument();

  });
});
