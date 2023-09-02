import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import CreateWorkoutForm from './create-workout-form';
import { makeFakeWorkout} from '../../utils/mocks';

const mockStore = configureMockStore();
const fakeWorkout = makeFakeWorkout();

const store = mockStore({
  DATA_WORKOUTS: {workouts: [fakeWorkout], userWorkouts: [], coachWorkouts: [],
    isWorkoutsCatalogLoading: false, isCoachWorkoutsLoading: false,
    isWorkoutLoading: false, workout: null},
});

describe('Component: CreateWorkoutForm', () => {
  it('should render "CreateWorkoutForm"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CreateWorkoutForm
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Информация о тренировке')).toBeInTheDocument();
    expect(screen.getByText('Редактировать')).toBeInTheDocument();

    expect(screen.getByTestId('nameWorkout')).toBeInTheDocument();
    expect(screen.getByTestId('price')).toBeInTheDocument();

  });
});
