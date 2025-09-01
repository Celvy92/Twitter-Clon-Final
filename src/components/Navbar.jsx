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
            <Link to="/profile">@{user.username}</Link>
            <button className="btn" onClick={() => { logout(); navigate('/'); }}>
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
