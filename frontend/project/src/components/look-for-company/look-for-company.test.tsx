import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import LookForCompany from './look-for-company';
import { makeFakeUserFull} from '../../utils/mocks';
import { AuthorizationStatus, LOCATION_DATA } from '../../constant';

const mockStore = configureMockStore();
const fakeUserCatalog = Array.from({length: 5}, () => makeFakeUserFull());

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, loggedUser: null, userFull: null, 
    isLoading: false, isUserCatalogLoading: false, existsEmail: false,
    users: fakeUserCatalog, userOther: null, isUserOtherLoading: false},
});


describe('Component: LookForCompany', () => {
    it('should render "LookForCompany"', () => {
      const history = createMemoryHistory();
  
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <HelmetProvider>
              <LookForCompany
                users={fakeUserCatalog}
              />
            </HelmetProvider>
          </HistoryRouter>
        </Provider>,
      );
  
      expect(screen.getByRole('list')).toBeInTheDocument();

  });
});
