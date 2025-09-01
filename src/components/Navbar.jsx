import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <Link to="/">Inicio</Link>
      <div className="spacer">
        {user ? (
          <>
            <Link to="/profile" style={{display:'flex',alignItems:'center',gap:8}}>
              <img src={user.avatar || 'https://i.pravatar.cc/64?u=anon'} alt="@me" width="28" height="28" style={{borderRadius:'50%'}} />
              @{user.username}
            </Link>
            <button className="btn btn-primary" onClick={() => { logout(); navigate('/'); }}>
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Entrar</Link>
            <Link to="/register">Crear cuenta</Link>
          </>
        )}
      </div>
    </nav>
  );
}
