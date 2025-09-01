import { useState, useMemo } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const MAX = 280;

export default function TweetBox({ onTweet }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const remaining = useMemo(() => MAX - text.length, [text]);
  const over = remaining < 0;

  const handleTweet = (e) => {
    e.preventDefault();
    if (!user) { navigate('/login', { state: { from: { pathname: '/' } } }); return; }
    const clean = text.trim();
    if (!clean || over) return;
    onTweet(clean);
    setText('');
  };

  return (
    <form onSubmit={handleTweet} className="card" style={{ display:'grid', gridTemplateColumns:'48px 1fr', gap:12 }}>
      <img
        src={user?.avatar || 'https://i.pravatar.cc/64?u=anon'}
        alt={user ? '@'+user.username : 'anon'}
        width="48" height="48" style={{borderRadius:'50%'}}
      />
      <div style={{display:'grid', gap:10}}>
        <textarea
          className="textarea"
          placeholder={user ? '¿Qué está pasando?' : 'Inicia sesión para twittear...'}
          value={text}
          disabled={!user}
          onChange={e=>setText(e.target.value)}
          rows={3}
          maxLength={MAX+50} /* permite escribir un poco más pero bloqueamos el submit si supera 280 */
        />
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <span className="help">{user ? `@${user.username}` : 'Invitado'}</span>
          <div style={{display:'flex', gap:10, alignItems:'center'}}>
            <span className="help" style={{color: over ? 'crimson' : 'var(--muted)'}}>
              {remaining}
            </span>
            <button className="btn btn-primary" disabled={!user || !text.trim() || over}>Twittear</button>
          </div>
        </div>
      </div>
    </form>
  );
}
