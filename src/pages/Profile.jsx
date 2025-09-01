import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { updateProfile } from '../utils/authService';

export default function Profile() {
  const { user, /* loading, */ } = useAuth();
  const [form, setForm] = useState({
    username: user.username,
    email: user.email,
    avatar: user.avatar || '',
  });
  const [msg, setMsg] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      const u = updateProfile(form);
      setMsg('Perfil actualizado ✅');
      setForm({ username: u.username, email: u.email, avatar: u.avatar });
    } catch (err) {
      setMsg(err.message || 'Error');
    }
  };

  return (
    <div className="card" style={{display:'grid', gap:12}}>
      <h2>Perfil</h2>
      <div style={{display:'flex', gap:16, alignItems:'center'}}>
        <img src={form.avatar || 'https://i.pravatar.cc/64?u=anon'} alt="@avatar" width="64" height="64" style={{borderRadius:'50%'}} />
        <div className="help">Vista previa</div>
      </div>

      <form onSubmit={onSubmit} style={{display:'grid', gap:10}}>
        <input className="input" placeholder="Usuario" value={form.username} onChange={e=>setForm(f=>({...f, username:e.target.value}))}/>
        <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))}/>
        <input className="input" placeholder="URL de avatar (64x64 aprox.)" value={form.avatar} onChange={e=>setForm(f=>({...f, avatar:e.target.value}))}/>
        <button className="btn btn-primary">Guardar cambios</button>
      </form>

      {msg && <p className="help">{msg}</p>}
    </div>
  );
}
