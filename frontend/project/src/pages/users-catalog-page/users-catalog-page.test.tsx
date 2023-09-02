import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import UsersCatalogPage from './users-catalog-page';
import { makeFakeUserFull } from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus } from '../../constant';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeUserFull = Array.from({length: 5}, () => makeFakeUserFull());

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeUserFull[1], hasErrorLogin: false,
    users: null, userFullInfo: fakeUserFull, isUserLoading: false, isUserCatalogLoading: false,
    },
});

const history = createMemoryHistory();
jest.mock('../../hooks/use-scroll-to-up/use-scroll-to-up', () => function useScrollToUp() {
  return (
    <div>fake useScrollToUp</div>
  );
});
describe('Component: UsersCatalogPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <UsersCatalogPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(fakeUserFull[0].name)).toBeInTheDocument();
    expect(screen.getByTestId('users')).toBeInTheDocument();
  });

});
