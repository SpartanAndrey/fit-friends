import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import FriendsListUserPage from './friends-list-user-page';
import { makeFakeUserFull } from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus } from '../../constant';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeUserFull = Array.from({length: 5}, () => makeFakeUserFull());
const fakeFriends = Array.from({length: 5}, () => makeFakeUserFull());

const store = mockStore({
  USER: {authStatus: AuthorizationStatus.Auth, loggedUser: fakeUserFull[1], 
    userFull: fakeUserFull, isLoading: false, isUserCatalogLoading: false,existsEmail: false,
    users: fakeUserFull, userOther: null, isUserOtherLoading: false},
  DATA_FRIENDS: {friends: fakeFriends, isFriendsListLoading: false},
});

const history = createMemoryHistory();
jest.mock('../../hooks/use-scroll-to-up/use-scroll-to-up', () => function useScrollToUp() {
  return (
    <div>fake useScrollToUp</div>
  );
});
describe('Component: FriendsListUserPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <FriendsListUserPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('Мои друзья')).toBeInTheDocument();
    expect(screen.getByTestId('list')).toBeInTheDocument();
  });

});
