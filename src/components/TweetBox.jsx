import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function TweetBox({ onTweet }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const handleTweet = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/' } } });
      return;
    }
    const clean = text.trim();
    if (!clean) return;
    onTweet(clean, user.username);
    setText('');
  };

  return (
    <form onSubmit={handleTweet} className="card" style={{ display:'grid', gap:10 }}>
      <textarea
        className="textarea"
        placeholder={user ? '¿Qué está pasando?' : 'Inicia sesión para twittear...'}
        value={text}
        disabled={!user}
        onChange={e=>setText(e.target.value)}
        rows={3}
      />
      <div style={{display:'flex', justifyContent:'flex-end'}}>
        <button className="btn btn-primary" disabled={!user || !text.trim()}>Twittear</button>
      </div>
    </form>
  );
}
