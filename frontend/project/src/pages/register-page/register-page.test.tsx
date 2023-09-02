import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import RegisterPage from './register-page';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {AuthorizationStatus} from '../../constant';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  USER: {
    authStatus: AuthorizationStatus.Auth, loggedUser: null,
    userInfo: null, isLoading: false, isUserCatalogLoading: false, existsEmail: false,
    users: [], userOther: null, isUserOtherLoading: false,
  },
});


const history = createMemoryHistory();

describe('Component: RegisterPage', () => {
  it('should render correctly', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <RegisterPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    await userEvent.type(screen.getByTestId('mail'), 'mail@mail.ru');
    await userEvent.type(screen.getByTestId('name'), 'User Name');

    expect(screen.getByDisplayValue(/mail@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/User Name/i)).toBeInTheDocument();
  });

});
