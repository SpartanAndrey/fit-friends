import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import UsersCatalogCard from './users-catalog-card';
import { makeFakeUserFull} from '../../utils/mocks';
import { AuthorizationStatus } from '../../constant';

const mockStore = configureMockStore();
const fakeUserFull = makeFakeUserFull();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, loggedUser: fakeUserFull, userFullInfo: fakeUserFull, 
    isLoading: false, isUserCatalogLoading: false, existsEmail: false,
    users: [], userOther: null, isUserOtherLoading: false},
});


describe('Component: UsersCatalogCard', () => {
  it('should render "UsersCatalogCard"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <UsersCatalogCard
              user={fakeUserFull}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeUserFull.name)).toBeInTheDocument();
    expect(screen.getByText(fakeUserFull.location)).toBeInTheDocument();

  });
});
