import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-router/history-router';
import CoachInfo from './coach-info';
import { makeFakeUserCoach } from '../../utils/mocks';
import { AuthorizationStatus } from '../../constant';
import { HelmetProvider } from 'react-helmet-async';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUserCoach = makeFakeUserCoach();

const store = mockStore({
  USER: {authStatus: AuthorizationStatus.Auth, loggedUser: fakeUserCoach, userFullInfo: fakeUserCoach, 
    isLoading: false, isUserCatalogLoading: false, existsEmail: false,
   users: [], userOther: null, isUserOtherLoading: false},
});


describe('Component: CoachInfo', () => {
  it('should render "CoachInfo"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CoachInfo
              coach={fakeUserCoach}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Обо мне/i)).toBeInTheDocument();

    expect(screen.getByDisplayValue(fakeUserCoach.name)).toHaveAttribute('name', 'userName');
    expect(screen.getByDisplayValue(fakeUserCoach.description ? fakeUserCoach.description : '')).toHaveAttribute('name', 'description');

  });
});
