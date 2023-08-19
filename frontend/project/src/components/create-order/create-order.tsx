import { useState } from 'react';
import { Workout } from '../../types/workout';
import { useAppDispatch } from '../../hooks';
import { DEFAULT_ORDER_NUMBER, OrderType, PAYMENT_TYPES, PaymentType } from '../../constant';
import { postOrderAction } from '../../store/api-action';

type Prop ={
  handleClose?: () => void;
  workout: Workout;
}

const CreateOrder = ({workout, handleClose}: Prop): JSX.Element => {
  const dispatch = useAppDispatch();

  const [workoutNumber, setWorkoutNumber] = useState(DEFAULT_ORDER_NUMBER);

  const workoutNumberHandle = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (evt.currentTarget.name === 'minus') {
      setWorkoutNumber(workoutNumber === 1 ? workoutNumber : workoutNumber - 1);
    } else {
      setWorkoutNumber(workoutNumber + 1);
    }
  };

  const [paymentType, setPaymentType] = useState<PaymentType>();
  const [isNotPaymentType, setIsNotPaymentType] = useState(false);

  const paymentTypeChangeHandle = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setPaymentType(value as PaymentType);
    evt.target.setAttribute('checked', 'true');
    setIsNotPaymentType(false);
  };

  const [isDone, setIsDone] = useState(false);

  const createOrderHandle = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (paymentType && workout.id) {
      const data = {
        workoutId: workout.id,
        quantity: workoutNumber,
        paymentType: paymentType,
        coachId: workout.coachId,
        orderType: OrderType.Workout,
      };
      dispatch(postOrderAction(data));
      setIsDone(true);
    }
    if(!paymentType) {
      setIsNotPaymentType(true);
    }
  };

  return (
    <div className="popup__wrapper">
      <div className="popup-head">
        <h2 className="popup-head__header">{isDone ? 'Заказ создан' : 'Купить тренировку'}</h2>
        <button
          className="btn-icon btn-icon--outlined btn-icon--big"
          type="button"
          aria-label="close"
          onClick={handleClose}
        >
          <svg width="20" height="20" aria-hidden="true">
            <use xlinkHref="#icon-cross"></use>
          </svg>
        </button>
      </div>
      <div className="popup__content popup__content--purchases">
        <div className="popup__product">
          <div className="popup__product-image">
            <picture>
              <img src={workout.backgroundImage} width="98" height="80" alt=""/>
            </picture>
          </div>
          <div className="popup__product-info">
            <h3 className="popup__product-title">{workout.title}</h3>
            <p className="popup__product-price">{workout.price} ₽</p>
          </div>
          <div className="popup__product-quantity">
            <p className="popup__quantity">Количество</p>
            <div className="input-quantity">
              <button
                className="btn-icon btn-icon--quantity"
                type="button"
                aria-label="minus"
                name="minus"
                onClick={workoutNumberHandle}
              >
                <svg width="12" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-minus"></use>
                </svg>
              </button>
              <div className="input-quantity__input">
                <label>
                  <input type="text" value={workoutNumber} size={2} readOnly />
                </label>
              </div>
              <button
                className="btn-icon btn-icon--quantity"
                type="button"
                aria-label="plus"
                name="plus"
                onClick={workoutNumberHandle}
              >
                <svg width="12" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-plus"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <section className="payment-method">
          {!isNotPaymentType && <h4 className="payment-method__title">Выберите способ оплаты</h4>}
          {isNotPaymentType && <h4 className="payment-method__title" style={{color: 'red'}}>Выберите способ оплаты</h4>}
          <ul className="payment-method__list">

            {PAYMENT_TYPES.map((el)=>
              (
                <li className="payment-method__item" key={el}>
                  <div className="btn-radio-image">
                    <label>
                      {el === PaymentType.Visa ?
                        (
                          <input
                            type="radio"
                            name="payment"
                            id={el}
                            value={el}
                            required
                            onChange={paymentTypeChangeHandle}
                          />
                        )
                        :
                        (
                          <input
                            type="radio"
                            name="payment"
                            id={el}
                            value={el}
                            onChange={paymentTypeChangeHandle}
                          />
                        )}
                      <span className="btn-radio-image__image">
                        <svg width="58" height="20" aria-hidden="true">
                          <use xlinkHref={`#${el}-logo`}></use>
                        </svg>
                      </span>
                    </label>
                  </div>
                </li>
              )
            )}
          </ul>
        </section>
        <div className="popup__total">
          <p className="popup__total-text">Итого</p>
          <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
            <use xlinkHref="#dash-line"></use>
          </svg>
          <p className="popup__total-price">{Number(workout.price) * workoutNumber} ₽</p>
        </div>
        <div className="popup__button">
          <button
            className="btn"
            type="button"
            onClick={createOrderHandle}
            disabled={isDone}
          >Купить
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateOrder;
