import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-router/history-router';
import UserInfo from './user-info';
import { makeFakeUserSimple } from '../../utils/mocks';
import { AuthorizationStatus } from '../../constant';
import { HelmetProvider } from 'react-helmet-async';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUserSimple = makeFakeUserSimple();

const store = mockStore({
  USER: {authStatus: AuthorizationStatus.Auth, loggedUser: fakeUserSimple, userFullInfo: fakeUserSimple, 
    isLoading: false, isUserCatalogLoading: false, existsEmail: false,
   users: [], userOther: null, isUserOtherLoading: false},
});


describe('Component: UserInfo', () => {
  it('should render "UserInfo"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <UserInfo
              user={fakeUserSimple}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Обо мне/i)).toBeInTheDocument();

    expect(screen.getByDisplayValue(fakeUserSimple.name)).toHaveAttribute('name', 'userName');
    expect(screen.getByDisplayValue(fakeUserSimple.description ? fakeUserSimple.description : '')).toHaveAttribute('name', 'description');

  });
});
