import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkAuth } from '../lib/customerApi';
import { fetchCartCount } from '../lib/cartApi';
import CreamyIcon from './CreamyIcon';
import BrandLogo from './BrandLogo';

export default function Header() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [auth, setAuth] = useState(null);

  const refreshCount = () => {
    fetchCartCount()
      .then((data) => setCartCount(Number(data.total_items || 0)))
      .catch(() => setCartCount(0));
  };

  useEffect(() => {
    refreshCount();
    checkAuth().then(setAuth).catch(() => setAuth({ authenticated: false }));
    const onUpdate = (e) => setCartCount(Number(e.detail?.count ?? 0));
    window.addEventListener('cart-updated', onUpdate);
    return () => window.removeEventListener('cart-updated', onUpdate);
  }, []);

  const accountLink = () => {
    if (!auth?.authenticated) return '/login';
    if (auth.role === 'admin') return '/admin';
    if (auth.role === 'staff') return '/staff';
    return '/orders';
  };

  const accountLabel = auth?.authenticated
    ? (auth.user?.fullname || auth.user?.username || 'Account')
    : 'Log in';

  return (
    <header>
      <BrandLogo className="header-logo" linkTo="/" iconSize={40} />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Product</Link>
        <Link to="/about">About Us</Link>
        <Link to="/orders">My Orders</Link>
        <Link to="/testimonial">Testimonial</Link>
      </nav>
      <div className="header-actions">
        <Link className="icon" to={accountLink()} aria-label={accountLabel} title={accountLabel}>
          👤
        </Link>
        <Link className="icon cart-link" to="/cart" aria-label="View cart" data-cart-link>
          🛒
          <span className="cart-badge" data-cart-badge hidden={cartCount <= 0} aria-hidden={cartCount <= 0}>
            {cartCount > 0 ? cartCount : ''}
          </span>
        </Link>
        <button
          type="button"
          className="btn-contact"
          onClick={() => {
            window.location.href = "mailto:hello@jojos.com?subject=Jojo's%20Inquiry";
          }}
        >
          Contact Us
        </button>
        {auth?.authenticated && auth.role === 'user' ? (
          <button
            type="button"
            className="btn-contact"
            style={{ background: 'transparent', color: 'var(--primary-pink, #ff4d8d)', border: '1px solid rgba(255,77,141,0.3)' }}
            onClick={() => navigate('/orders')}
          >
            Hi, {auth.user?.fullname?.split(' ')[0] || 'there'}
          </button>
        ) : null}
      </div>
    </header>
  );
}
