import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { act, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';

const mockStore = configureMockStore();
const store = mockStore();

describe('Component: HistoryRoute', () => {
  it('component should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <h1>Page</h1>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Page')).toBeInTheDocument();
  });

  it('should redirect correctly', () => {
    const history = createMemoryHistory();

    history.push('/path');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={'/path'}
              element={<h1>Page</h1>}
            />
            <Route
              path={'/new-path'}
              element={<h1>New Page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    act(() => history.push('/new-path'));

    expect(screen.getByText('New Page')).toBeInTheDocument();
  });
});