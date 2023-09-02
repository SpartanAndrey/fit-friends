import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import FriendsListCard from './friends-list-card';
import { makeFakeUserFull } from '../../utils/mocks';
import { UserRole } from '../../constant';

const mockStore = configureMockStore();
const fakeFriend = makeFakeUserFull();


const store = mockStore({
  DATA_FRIENDS: {friends: [fakeFriend], isFriendsDataLoading: false}
});

describe('Component: FriendsListCard', () => {
  it('should render "FriendsListCard"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <FriendsListCard
              user={fakeFriend}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeFriend.name)).toBeInTheDocument();
    expect(screen.getByText(fakeFriend.location)).toBeInTheDocument();

  });
});
