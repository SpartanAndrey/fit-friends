import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import PopupMap from './popup-map';
import { makeFakeUserFull} from '../../utils/mocks';
import { AuthorizationStatus } from '../../constant';

const mockStore = configureMockStore();
const fakeUserFull = makeFakeUserFull();

const store = mockStore({
  USER: {authStatus: AuthorizationStatus.Auth, loggedUser: fakeUserFull, userFullInfo: fakeUserFull, 
    isLoading: false, isUserCatalogLoading: false, existsEmail: false,
    users: [], userOther: null, isUserOtherLoading: false},
});

describe('Component: PopupMap', () => {
  it('should render "PopupMap"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <PopupMap
              userName={fakeUserFull.name}
              location={fakeUserFull.location}
              handleClose={jest.fn()}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeUserFull.name)).toBeInTheDocument();
    expect(screen.getByText(`м. ${fakeUserFull.location}`)).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();

  });
});
