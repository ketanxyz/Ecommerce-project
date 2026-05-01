import { Link } from 'react-router';
import Header from '../../components/navbar/Header';
import './NotFoundPage.css';

export function NotFoundPage({ cart = [] }) {
  return (
    <>
      <title>404 – Page Not Found | SimpleCart</title>
      <Header cart={cart} />
      <div className="not-found-page">
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Page not found</h1>
        <p className="not-found-msg">The page you're looking for doesn't exist or has been moved.</p>
        <Link className="not-found-btn" to="/">Back to Home</Link>
      </div>
    </>
  );
}
