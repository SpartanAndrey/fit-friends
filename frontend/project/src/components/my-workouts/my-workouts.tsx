import React, {useState, useEffect} from 'react';
import MultiRangeSlider, { ChangeResult } from 'multi-range-slider-react';
import Header from '../../components/header/header';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { getCoachWorkouts, getCoachWorkoutsLoadingStatus } from '../../store/workout-process/workout-selectors';
import { DEFAULT_CALORIES_STEP, DEFAULT_PRICE_NUMBER, DEFAULT_RATING_STEP, DEFAULT_WORKOUTS_CATALOG_NUMBER, MAX_CALORIES_NUMBER, MAX_RATING_NUMBER, MIN_CALORIES_NUMBER, MIN_RATING_NUMBER, WORKOUT_TIMES, WorkoutTime } from '../../constant';
import LoadingSlider from '../loading-slider/loading-slider';
import { WorkoutListQuery } from '../../types/query';
import { fetchCoachWorkoutsAction } from '../../store/api-action';
import WorkoutsCatalogCard from '../workouts-catalog-card/workouts-catalog-card';

function MyWorkoutsPage() {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isWorkoutDataLoading = useAppSelector(getCoachWorkoutsLoadingStatus);
    const workouts = useAppSelector(getCoachWorkouts);
    const workoutsNumber = workouts ? workouts.length : 0;
    const workoutsPrices = workouts
      ? workouts.map((workout) => workout.price)
      : 0;
    const pagesNumber = Math.ceil(
      workoutsNumber / DEFAULT_WORKOUTS_CATALOG_NUMBER
    );

    if (isWorkoutDataLoading) {
      <LoadingSlider />;
    }

    if (!workouts) {
      return null;
    }

  const [query, setQuery] = useState<WorkoutListQuery>({limit: DEFAULT_WORKOUTS_CATALOG_NUMBER, page: 1});

  const [formValue, setValue] = useState({
    minPrice: DEFAULT_PRICE_NUMBER, 
    maxPrice: workoutsPrices ? Math.max.apply(null, workoutsPrices) : DEFAULT_PRICE_NUMBER,
    minCalories: MIN_CALORIES_NUMBER, 
    maxCalories: MAX_CALORIES_NUMBER,
    minRating: MIN_RATING_NUMBER, 
    maxRating: MAX_RATING_NUMBER,
  });

  const [sliderValue, setSliderValue] = useState({
    minPrice: DEFAULT_PRICE_NUMBER, 
    maxPrice: workoutsPrices ? Math.max.apply(null, workoutsPrices) : DEFAULT_PRICE_NUMBER,
    minCalories: MIN_CALORIES_NUMBER, 
    maxCalories: MAX_CALORIES_NUMBER,
    minRating: MIN_RATING_NUMBER, 
    maxRating: MAX_RATING_NUMBER,
  });

  const filterChangeHandle = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    const {value, name} = evt.target;
    const valueNum = Math.max(0, Number(value));
    setValue({...formValue, [name]: valueNum});

    if (name === 'minPrice' && Number(valueNum) <= formValue.maxPrice) {
      setQuery({...query, priceMin: Number(valueNum)});
    } 
    if (name === 'maxPrice' && Number(valueNum) >= formValue.minPrice) {
      setQuery({...query, priceMax: Number(valueNum)});
    }
    if ((name === 'maxPrice' && Number(valueNum) === 0 && formValue.minPrice === 0)
      || (name === 'minPrice' && Number(valueNum) === 0 && formValue.maxPrice === 0)) {
      setQuery({...query, priceMin: undefined, priceMax: undefined});
    }

    if (name === 'minCalories' && Number(valueNum) <= formValue.maxCalories) {
      setQuery({...query, caloriesMin: Number(valueNum)});
    }
    if (name === 'maxCalories' && Number(valueNum) >= formValue.minCalories) {
      setQuery({...query, caloriesMax: formValue.minCalories});
    }
    if ((name === 'maxCalories' && Number(valueNum) === 0 && formValue.minCalories === 0)
      || (name === 'minCalories' && Number(valueNum) === 0 && formValue.maxCalories === 0)) {
      setQuery({...query, caloriesMin: undefined, caloriesMax: undefined});
    }

    if (name === 'duration') {
      const isChecked = !!(query && query?.times && query?.times.find((el) => el === value as WorkoutTime));
      if (isChecked && query.times) {
        const currentArr = query.times.filter((el) => el !== value);
        evt.target.removeAttribute('checked');
        currentArr.length === 0 ? setQuery({...query, times: undefined}) : setQuery({...query, times: currentArr});
      }
      else {
        const currentArr = query && query.times ? query.times : [];
        setQuery({...query, times: [...currentArr, value as WorkoutTime]});
        evt.target.setAttribute('checked', 'true');
      }
    }
  };

  useEffect(()=>{
    dispatch(fetchCoachWorkoutsAction(query));
  }, [dispatch, query]);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Мои тренировки</h1>
              <div className="my-training-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="my-training-form__wrapper">
                  <button
                    className="btn-flat btn-flat--underlined my-training-form__btnback"
                    type="button"
                    onClick={() => navigate(-1)}
                  >
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg><span>Назад</span>
                  </button>
                  <h3 className="my-training-form__title">фильтры</h3>
                  <form className="my-training-form__form">
                    <div className="my-training-form__block my-training-form__block--price">
                      <h4 className="my-training-form__block-title">Цена, ₽</h4>
                      <div className="filter-price">
                        <div className="filter-price__input-text filter-price__input-text--min">
                          <input
                            type="number"
                            id="minPrice"
                            name="minPrice"
                            value={formValue.minPrice}
                            onChange={filterChangeHandle}
                          />
                          <label htmlFor="minPrice">от</label>
                        </div>
                        <div className="filter-price__input-text filter-price__input-text--max">
                          <input
                            type="number"
                            id="maxPrice"
                            name="maxPrice"
                            value={formValue.maxPrice}
                            onChange={filterChangeHandle}
                          />
                          <label htmlFor="maxPrice">до</label>
                        </div>
                      </div>
                      <div className="filter-range">
                        <MultiRangeSlider
                          min={0}
                          max={formValue.maxPrice}
                          step={100}
                          style={{border: 'none', boxShadow: 'none', padding: '15px 10px'}}
                          ruler='false'
                          barLeftColor='black'
                          barInnerColor='black'
                          barRightColor='black'
                          thumbLeftColor='black'
                          thumbRightColor='black'
                          minValue={sliderValue.minPrice}
                          maxValue={sliderValue.maxPrice}
                          onInput={(e: ChangeResult) => {
                            setSliderValue({...sliderValue, minPrice: e.minValue, maxPrice: e.maxValue});
                            setQuery({...query, priceMin: Number(e.minValue), priceMax: Number(e.maxValue)});
                          }}
                        />
                      </div>
                    </div>
                    <div className="my-training-form__block my-training-form__block--calories">
                      <h4 className="my-training-form__block-title">Калории</h4>
                      <div className="filter-calories">
                        <div className="filter-calories__input-text filter-calories__input-text--min">
                          <input
                            type="number"
                            id="minCalories"
                            name="minCalories"
                            value={formValue.minCalories}
                            onChange={filterChangeHandle}
                          />
                          <label htmlFor="minCalories">от</label>
                        </div>
                        <div className="filter-calories__input-text filter-calories__input-text--max">
                          <input
                            type="number"
                            id="maxCalories"
                            name="maxCalories"
                            value={formValue.maxCalories}
                            onChange={filterChangeHandle}
                          />
                          <label htmlFor="maxCalories">до</label>
                        </div>
                      </div>
                      <div className="filter-range">
                        <MultiRangeSlider
                          min={MIN_CALORIES_NUMBER}
                          max={MAX_CALORIES_NUMBER}
                          step={DEFAULT_CALORIES_STEP}
                          style={{border: 'none', boxShadow: 'none', padding: '15px 10px'}}
                          ruler='false'
                          barLeftColor='black'
                          barInnerColor='black'
                          barRightColor='black'
                          thumbLeftColor='black'
                          thumbRightColor='black'
                          minValue={formValue.minCalories}
                          maxValue={formValue.maxCalories}
                          onChange={(e: ChangeResult) => {
                            setValue({...formValue, minCalories: e.minValue, maxCalories: e.maxValue});
                            setQuery({...query, caloriesMin: Number(e.minValue), caloriesMax: Number(e.maxValue)});
                          }}
                        />
                      </div>
                    </div>
                    <div className="my-training-form__block my-training-form__block--raiting">
                      <h4 className="my-training-form__block-title">Рейтинг</h4>
                      <div className="filter-raiting">
                        <MultiRangeSlider
                          min={MIN_RATING_NUMBER}
                          max={MAX_RATING_NUMBER}
                          step={DEFAULT_RATING_STEP}
                          style={{border: 'none', boxShadow: 'none', padding: '15px 10px'}}
                          ruler='false'
                          barLeftColor='black'
                          barInnerColor='black'
                          barRightColor='black'
                          thumbLeftColor='black'
                          thumbRightColor='black'
                          minValue={formValue.minRating}
                          maxValue={formValue.maxRating}
                          onChange={(e: ChangeResult) => {
                            setValue({...formValue, minRating: e.minValue, maxRating: e.maxValue});
                            setQuery({...query, ratingMin: Number(e.minValue), ratingMax: Number(e.maxValue)});
                          }}
                        />
                      </div>
                    </div>
                    <div className="my-training-form__block my-training-form__block--duration">
                      <h4 className="my-training-form__block-title">Длительность</h4>
                      <ul className="my-training-form__check-list">
                        {WORKOUT_TIMES.map((el) => (
                          <li className="my-training-form__check-list-item" key={el}>
                            <div className="custom-toggle custom-toggle--checkbox">
                              <label>
                                <input
                                  type="checkbox"
                                  name="duration"
                                  value={el}
                                  id={el}
                                  onChange={filterChangeHandle}
                                />
                                <span className="custom-toggle__icon">
                                  <svg width="9" height="6" aria-hidden="true">
                                    <use xlinkHref="#arrow-check"></use>
                                  </svg>
                                </span>
                                <span className="custom-toggle__label">{el}</span>
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
              <div className="inner-page__content">
                <div className="my-trainings">
                  <ul className="my-trainings__list" data-testid="trainings">
                    {workouts.map((el) =>
                      (
                        <li className="my-trainings__item" key={el.id}>
                          <div className="thumbnail-training" key={el.id}>
                            <WorkoutsCatalogCard workout={el}/>
                          </div>
                        </li>)
                    )}
                  </ul>
                  <div className="show-more my-trainings__show-more">
                    {pagesNumber !== query.page &&
                  <button
                    className="btn show-more__button show-more__button--more"
                    type="button"
                    onClick={() => setQuery({...query, page: query.page ? query.page + 1 : 1})}
                  >Показать еще
                  </button> }
                    {pagesNumber === query.page && pagesNumber !== 1 &&
                  <button className="btn show-more__button" type="button" onClick={scrollToTop}>Вернуться в начало</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MyWorkoutsPage;
