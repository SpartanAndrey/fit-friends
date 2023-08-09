import { CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '100px auto',
};

function LoadingSlider(): JSX.Element {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color={'#4090dd'}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default LoadingSlider;
