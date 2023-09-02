import {render, screen} from '@testing-library/react';
import NotFoundPage from './not-found-page';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-router/history-router';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <NotFoundPage />
      </HistoryRouter>,
    );

    const headerElement = screen.getByText('404');

    expect(headerElement).toBeInTheDocument();
  });
});