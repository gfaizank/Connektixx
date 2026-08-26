import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'Connektixx@2025';

const AdminApp = () => {
  const [isAuth, setIsAuth] = useState(() => {
    try { return sessionStorage.getItem('connektixx_admin_auth') === 'true'; } catch { return false; }
  });

  const handleLogin = (username, password) => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      try { sessionStorage.setItem('connektixx_admin_auth', 'true'); } catch {}
      setIsAuth(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    try { sessionStorage.removeItem('connektixx_admin_auth'); } catch {}
    setIsAuth(false);
  };

  if (!isAuth) return <AdminLogin onLogin={handleLogin} />;
  return <AdminDashboard onLogout={handleLogout} />;
};

export default AdminApp;
