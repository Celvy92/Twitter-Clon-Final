import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Register() {
  const { register, loading } = useAuth();
  const [form, setForm] = useState({ username:'', email:'', password:'', avatar:'' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await register(form);
      navigate('/', { replace: true });
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="card" style={{ display:'grid', gap:8 }}>
      <h2>Crear cuenta</h2>
      <input className="input" placeholder="Usuario (minúsculas)" value={form.username} onChange={e=>setForm(f=>({...f, username:e.target.value}))}/>
      <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))}/>
      <input className="input" placeholder="Contraseña" type="password" value={form.password} onChange={e=>setForm(f=>({...f, password:e.target.value}))}/>
      <input className="input" placeholder="URL de avatar (opcional)" value={form.avatar} onChange={e=>setForm(f=>({...f, avatar:e.target.value}))}/>
      {err && <p style={{ color:'crimson' }}>{err}</p>}
      <button className="btn btn-primary" disabled={loading}>{loading ? 'Creando...' : 'Registrarme'}</button>
      <p className="help">¿Ya tienes cuenta? <Link to="/login">Entrar</Link></p>
    </form>
  );
}
