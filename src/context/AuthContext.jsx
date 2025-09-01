import { createContext, useEffect, useMemo, useState } from 'react';
import { getCurrentUser, login as loginSvc, logout as logoutSvc, register as registerSvc } from '../utils/authService';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());
  const [loading, setLoading] = useState(false);

  const login = async (emailOrUsername, password) => {
    setLoading(true);
    try {
      const u = await loginSvc({ emailOrUsername, password });
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      const u = await registerSvc(data);
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutSvc();
    setUser(null);
  };

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'tw_session') setUser(getCurrentUser());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
