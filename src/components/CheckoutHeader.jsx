import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import './CheckoutHeader.css';

const CheckoutHeader = ({ cart = [] }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="checkout-header">
      <div className="checkout-header__content">
        <div className="checkout-header__left">
          <Link to="/">
            <img className="checkout-header__logo" src="/images/logo.png" alt="SimpleCart" />
            <img className="checkout-header__logo-mobile" src="/images/mobile-logo.png" alt="SimpleCart" />
          </Link>
        </div>

        <div className="checkout-header__middle">
          Checkout &nbsp;
          <Link className="checkout-header__items-link" to="/">
            ({totalQuantity} item{totalQuantity !== 1 ? 's' : ''})
          </Link>
        </div>

        <div className="checkout-header__right">
          {user ? (
            <button className="checkout-header__user-btn" onClick={handleLogout} title={`Signed in as ${user.name} — click to sign out`}>
              <div className="checkout-header__avatar">{user.name.charAt(0).toUpperCase()}</div>
            </button>
          ) : (
            <img src="/images/icons/checkout-lock-icon.png" alt="Secure checkout" style={{height:'32px'}} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;
