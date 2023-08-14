import { LOCATION_DATA, UserLocation } from '../../constant';
import Map from '../map/map';

type Props ={
  handleClose?: () => void;
  userName: string;
  location: UserLocation;
}

const PopupMap = ({userName, location, handleClose}: Props): JSX.Element => {
  const currentPoint = LOCATION_DATA.find((el) => el.name === location)?.location;
  return (
    <section className="popup">
      <div className="popup__wrapper popup__wrapper--map">
        <div className="popup-head popup-head--address">
          <h2 className="popup-head__header">{userName}</h2>
          <p className="popup-head__address">
            <svg className="popup-head__icon-location" width="12" height="14" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg><span>м. {location}</span>
          </p>
          <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={handleClose}>
            <svg width="20" height="20" aria-hidden="true">
              <use xlinkHref="#icon-cross"></use>
            </svg>
          </button>
        </div>
        <div className="popup__content-map">

          {currentPoint && <Map position={currentPoint}/>}
        </div>
      </div>
    </section>
  );
};
export default PopupMap;
