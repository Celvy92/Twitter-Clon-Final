import { useMemo } from 'react';

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s/60); if (m < 60) return `${m}min`;
  const h = Math.floor(m/60); if (h < 24) return `${h}h`;
  const d = Math.floor(h/24); return `${d}d`;
}

export default function Tweet({ t, onLike }) {
  const when = useMemo(() => timeAgo(t.createdAt), [t.createdAt]);
  return (
    <article className="card" style={{display:'grid', gridTemplateColumns:'48px 1fr', gap:12}}>
      <img src={t.avatar} alt={`@${t.author}`} width="48" height="48" style={{borderRadius:'50%'}} />
      <div style={{display:'grid', gap:6}}>
        <div style={{display:'flex', gap:6, alignItems:'baseline'}}>
          <b>@{t.author}</b>
          <span className="help">· {when}</span>
        </div>
        <div style={{whiteSpace:'pre-wrap'}}>{t.text}</div>
        <div style={{display:'flex', gap:16, marginTop:4}}>
          <button
            className="btn"
            onClick={() => onLike(t.id)}
            style={{
              padding:'6px 10px',
              background: t.likedByMe ? 'var(--primary)' : 'transparent',
              color: t.likedByMe ? '#fff' : 'var(--muted)',
              border: `1px solid ${t.likedByMe ? 'var(--primary)' : 'var(--border)'}`,
            }}
          >
            ♥ {t.likes}
          </button>
        </div>
      </div>
    </article>
  );
}
