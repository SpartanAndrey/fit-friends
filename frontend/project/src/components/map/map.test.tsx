import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import Map from './map';
import { makeFakeUserFull} from '../../utils/mocks';
import { AuthorizationStatus, LOCATION_DATA } from '../../constant';

const mockStore = configureMockStore();
const fakeUserFull = makeFakeUserFull();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, loggedUser: fakeUserFull, userFull: fakeUserFull, 
    isLoading: false, isUserCatalogLoading: false, existsEmail: false,
    users: [], userOther: null, isUserOtherLoading: false},
});


const currentPoint = LOCATION_DATA[Math.floor(Math.random() * LOCATION_DATA.length)];

describe('Component: Map', () => {
  it('should render "Map"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Map
              position={currentPoint.location}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();

  });
});
