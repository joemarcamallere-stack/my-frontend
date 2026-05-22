import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { checkAuth } from '../lib/adminApi';

export default function RequireRole({ role, children }) {
  const [state, setState] = useState({ loading: true, ok: false });
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    checkAuth()
      .then((data) => {
        if (!mounted) return;
        setState({
          loading: false,
          ok: data.authenticated && data.role === role,
        });
      })
      .catch(() => {
        if (mounted) setState({ loading: false, ok: false });
      });
    return () => { mounted = false; };
  }, [role, location.pathname]);

  if (state.loading) {
    return <div className="admin-shell" style={{ padding: 40, textAlign: 'center' }}>Loading…</div>;
  }

  if (!state.ok) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
