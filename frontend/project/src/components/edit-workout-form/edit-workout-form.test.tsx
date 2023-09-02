import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import EditWorkoutForm from './edit-workout-form';
import { makeFakeUserFull, makeFakeWorkout} from '../../utils/mocks';
import { AuthorizationStatus } from '../../constant';

const mockStore = configureMockStore();
const fakeWorkout = makeFakeWorkout();
const fakeUserFull = makeFakeUserFull();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, loggedUser: fakeUserFull, userFull: fakeUserFull, 
    isLoading: false, isUserCatalogLoading: false, existsEmail: false,
    users: [], userOther: null, isUserOtherLoading: false},
  DATA_WORKOUTS: {workouts: [fakeWorkout], userWorkouts: [], coachWorkouts: [],
    isWorkoutsCatalogLoading: false, isCoachWorkoutsLoading: false,
    isWorkoutLoading: false, workout: null},
});

describe('Component: EditWorkoutForm', () => {
  it('should render "EditWorkoutForm"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <EditWorkoutForm
              user={fakeUserFull}
              workout={fakeWorkout}
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
