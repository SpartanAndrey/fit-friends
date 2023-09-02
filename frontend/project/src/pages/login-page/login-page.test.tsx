import {render, screen} from '@testing-library/react';
import LoginPage from './login-page';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus} from '../../constant';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  USER: {authStatus: AuthorizationStatus.NoAuth},
});
describe('Component: LoginPage', () => {
  it('should render correctly', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginPage />
        </HistoryRouter>,
      </Provider>
    );

    await userEvent.type(screen.getByTestId('mail'), 'sp@mail.ru');
    await userEvent.type(screen.getByTestId('password'), 'asd123456');

    expect(screen.getByDisplayValue(/sp@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/asd123456/i)).toBeInTheDocument();
  });


});