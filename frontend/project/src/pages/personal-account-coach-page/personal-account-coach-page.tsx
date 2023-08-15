import { Link} from 'react-router-dom';
import CoachInfo from '../../components/coach-info/coach-info';
import CertificateSlider from '../../components/certificate-slider/certificate-slider';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserCoach, getUserLoadingStatus } from '../../store/user-process/user-selectors';
import { redirectToRoute } from '../../store/action';
import { AppRoute } from '../../constant';
import LoadingSlider from '../../components/loading-slider/loading-slider';
import { useEffect, useState } from 'react';
import Header from '../../components/header/header';

function PersonalAccountCoachPage(): JSX.Element {

  const dispatch = useAppDispatch();

  const coachInfo = useAppSelector(getUserCoach);

  const loadingStatus = useAppSelector(getUserLoadingStatus)

  const [, setCertificates] = useState<string[]>([]);

  useEffect(() => {
    if (coachInfo && coachInfo.certificates) {
      setCertificates(coachInfo.certificates);
    }
  }, [coachInfo])

  if (loadingStatus) {
    <LoadingSlider/>;
  }

  if (coachInfo === undefined) {
    dispatch(redirectToRoute(AppRoute.NotFound))
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              {coachInfo ? <CoachInfo coach={coachInfo}/> : ''}
              <div className="inner-page__content">
                <div className="personal-account-coach">
                  <div className="personal-account-coach__navigation">
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={`${AppRoute.PersonalAccountCoach}/workouts`}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-flash"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои тренировки</span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={`${AppRoute.PersonalAccountCoach}/workouts/create`}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-add"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Создать тренировку</span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={`${AppRoute.PersonalAccountCoach}/friends`}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-friends"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={`${AppRoute.PersonalAccountCoach}/orders`}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-bag"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои заказы</span>
                    </Link>
                    <div className="personal-account-coach__calendar">
                      <div className="thumbnail-spec-gym">
                        <div className="thumbnail-spec-gym__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" />
                            <img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
                          </picture>
                        </div>
                        <div className="thumbnail-spec-gym__header" style={{ display: 'flex', justifyContent: 'center' }}>
                          <h3 className="thumbnail-spec-gym__title">Скоро тут будет интересно</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CertificateSlider />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PersonalAccountCoachPage;
