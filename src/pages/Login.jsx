import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Login() {
  const { login, loading } = useAuth();
  const [emailOrUsername, setEou] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await login(emailOrUsername.trim(), password);
      navigate(from, { replace: true });
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display:'grid', gap:8 }}>
      <h2>Iniciar sesión</h2>
      <input placeholder="Email o usuario" value={emailOrUsername} onChange={e=>setEou(e.target.value)} />
      <input placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      {err && <p style={{ color:'crimson' }}>{err}</p>}
      <button disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
      <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
    </form>
  );
}
