import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { UserRole } from "../../constant";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUser, getUserLoadingStatus } from "../../store/user-process/user-selectors";
import { getReviews, getReviewsLoadingStatus, getWorkout, getWorkoutLoadingStatus } from "../../store/workout-process/workout-selectors";
import { fetchReviewsAction, fetchUserAction, fetchWorkoutAction } from "../../store/api-action";
import LoadingSlider from "../../components/loading-slider/loading-slider";
import Header from "../../components/header/header";
import ReviewCard from "../../components/review-card/review-card";
import AddReview from "../../components/add-review/add-review";
import PopupWindow from "../../components/popup-window/popup-window";
import EditWorkoutForm from "../../components/edit-workout-form/edit-workout-form";

function WorkoutCardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isUserLoading = useAppSelector(getUserLoadingStatus);
  const isWorkoutLoading = useAppSelector(getWorkoutLoadingStatus);
  const isReviewsLoading = useAppSelector(getReviewsLoadingStatus);

  const user = useAppSelector(getUser);
  const workout = useAppSelector(getWorkout);
  const reviews = useAppSelector(getReviews);
 
  const isCoach = user?.role === UserRole.Coach;

  const [showModal, setShowModal] = useState(false);

  const togglePopup = () => {
    if (showModal && workout) {
      dispatch(fetchReviewsAction(String(workout.id)));
    }
    setShowModal(!showModal);
  };

  useEffect(()=>{
    if (workout) {
      dispatch(fetchUserAction(workout.coachId));
    }
  }, [dispatch]);

  useEffect(()=>{
    if (workout) {
      dispatch(fetchWorkoutAction(String(workout.id)));
    }
  }, [reviews, dispatch]);

  if (!workout) {
    return null;
  }

  if (!user) {
    return null;
  }

  if (isUserLoading || isWorkoutLoading || isReviewsLoading) {
    return (<LoadingSlider />);
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <aside className="reviews-side-bar">
                <button
                  className="btn-flat btn-flat--underlined reviews-side-bar__back"
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg><span>Назад</span>
                </button>
                <h2 className="reviews-side-bar__title">Отзывы</h2>
                <ul className="reviews-side-bar__list">
                  {reviews.map((review)=>
                    (
                      <li className="reviews-side-bar__item" key={review.id}>
                        <ReviewCard review={review} />
                      </li>)
                  )}
                </ul>
                <button
                  className="btn btn--medium reviews-side-bar__button"
                  type="button"
                  disabled={isCoach}
                  onClick={togglePopup}
                >
                    Оставить отзыв
                </button>
                {showModal &&
                <PopupWindow handleClose={togglePopup}>
                  <AddReview workoutId={workout.id} userId={user.id} handleClose={togglePopup} />
                </PopupWindow>}
              </aside>
              <EditWorkoutForm workout={workout} user={user} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default WorkoutCardPage;
