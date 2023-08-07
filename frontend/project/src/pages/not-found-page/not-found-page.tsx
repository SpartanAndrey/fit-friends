import {Link} from 'react-router-dom';
//import Logo from '../../components/logo/logo';

function NotFoundPage(): JSX.Element {
  return(
    <div className="page page--gray page--main">
      <div className="background-logo">
        <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
          <use xlinkHref="#logo-big"></use>
        </svg>
        <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
          <use xlinkHref="#icon-logotype"></use>
        </svg>
      </div>
      <main className="page__main page__main--index">
        <h1 style={{textAlign: 'center'}}>404.Page not found</h1>
        <Link style={{textAlign: 'center'}} to="/">Вернуться на главную</Link>
      </main>
    </div>
  );
}

export default NotFoundPage;
