import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import PopupWindow from './popup-window';
import { makeFakeUserFull} from '../../utils/mocks';
import { AuthorizationStatus } from '../../constant';

const mockStore = configureMockStore();
const fakeUserFull = makeFakeUserFull();

const store = mockStore({
  USER: {authStatus: AuthorizationStatus.Auth, loggedUser: fakeUserFull, userFullInfo: fakeUserFull, 
    isLoading: false, isUserCatalogLoading: false, existsEmail: false,
    users: [], userOther: null, isUserOtherLoading: false},
});

describe('Component: PopupWindow', () => {
  it('should render "PopupWindow"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <PopupWindow
              handleClose={jest.fn()}
            >
              <h1>Popup window</h1>
            </PopupWindow>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Popup window/i)).toBeInTheDocument();

  });
});
