import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { markAuthClientState } from '../lib/adminApi';
import { API_BASE } from '../lib/cartApi';
import '../styles/login.css';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');
  const [logoutIsError, setLogoutIsError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  useEffect(() => {
    document.body.classList.add('auth-page');
    return () => document.body.classList.remove('auth-page');
  }, []);

  useEffect(() => {
    if (location.state?.logoutMessage) {
      setLogoutMessage(location.state.logoutMessage);
      setLogoutIsError(false);
      navigate(location.pathname, { replace: true, state: {} });
    } else if (location.state?.logoutError) {
      setLogoutMessage(location.state.logoutError);
      setLogoutIsError(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLogoutMessage('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/auth_api.php?action=login`, {
        username,
        password
      }, {
        withCredentials: true // To maintain PHP sessions
      });

      if (res.data.success) {
        markAuthClientState(res.data.role, res.data.user);
        showToast(res.data.message || 'Welcome back!', 'success');
        if (res.data.role === 'admin') {
          navigate('/admin', { replace: true });
        } else if (res.data.role === 'staff') {
          navigate('/staff', { replace: true });
        } else {
          navigate('/orders', { replace: true });
        }
      } else {
        const msg = res.data.message || 'Login failed.';
        setError(msg);
        showToast(msg, 'error');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      const msg = 'An error occurred during login.';
      setError(msg);
      showToast(msg, 'error');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <main className="login-hero">
        <section className="login-intro" aria-label="Brand messaging">
          <p className="intro-kicker">Welcome back</p>
          <h1>Sign in to keep your <span className="accent">creamy cravings</span> curated.</h1>
          <p>Use your existing account to review carts, follow deliveries, and reorder your favorite scoops without missing a drop from the Jojo's experience.</p>
          <ul className="login-highlights">
            <li>
              <span className="icon-pill">1</span>
              Securely manage orders and saved carts in one place.
            </li>
            <li>
              <span className="icon-pill">2</span>
              Unlock seasonal drops plus member-only flavors.
            </li>
            <li>
              <span className="icon-pill">3</span>
              Sync every purchase with staff support for faster help.
            </li>
          </ul>
        </section>

        <section className="login-card" aria-label="Login form">
          <h2>Account Login</h2>
          <p className="card-subtitle">Enter your details to continue.</p>
          {logoutMessage && (
            <div
              className={`form-notice ${logoutIsError ? 'form-notice-error' : 'form-notice-success'}`}
              role="status"
            >
              {logoutMessage}
            </div>
          )}
          {error && <div className="form-error" id="error-box">{error}</div>}
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="username">
              Username
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </label>
            <button className="btn-login" type="submit" disabled={loading}>
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </form>
          <p className="signup-hint">Need an account? <Link to="/register">Sign up</Link></p>
        </section>
      </main>
    </div>
  );
}
