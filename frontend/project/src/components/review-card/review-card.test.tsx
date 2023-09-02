import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import ReviewCard from './review-card';
import { makeFakeReview} from '../../utils/mocks';

const mockStore = configureMockStore();
const fakeReview = makeFakeReview();

const store = mockStore({
  DATA_REVIEW: {reviews: [fakeReview], isReviewsLoading: false}
});

describe('Component: ReviewCard', () => {
  it('should render "ReviewCard"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ReviewCard
              review={fakeReview}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeReview.text)).toBeInTheDocument();

  });
});
