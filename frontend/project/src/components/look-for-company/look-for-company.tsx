import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { UserFull } from '../../types/user-full';
import { redirectToRoute } from '../../store/action';
import { AppRoute } from '../../constant';
import LookForCompanySlider from './look-for-company-slider';

type Props = {
  users: UserFull[];
}

const DEFAULT_VISIBLE_SLIDES = 4;

function LookForCompany({users}: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const [currentCard, setCurrentCard] = useState(0);

  const buttonBackClickHandle = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const buttonNextClickHandle = () => {
    if (currentCard < users.length - DEFAULT_VISIBLE_SLIDES) {
      setCurrentCard(currentCard + 1);
    }
  };

  const buttonViewAllHandle = () => {
    dispatch(redirectToRoute(AppRoute.UsersCatalog));
  };

  return(
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
            <button onClick={buttonViewAllHandle} className="btn-flat btn-flat--light look-for-company__button" type="button"><span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="look-for-company__controls">
              <button onClick={buttonBackClickHandle} className="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="previous">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button onClick={buttonNextClickHandle} className="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="next">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="look-for-company__list">
            <LookForCompanySlider currentCard={currentCard} users={users} visibleCards={DEFAULT_VISIBLE_SLIDES}/>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default LookForCompany;
