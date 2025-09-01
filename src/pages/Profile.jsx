import useAuth from '../hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <h2>Perfil</h2>
      <p><b>Usuario:</b> @{user.username}</p>
      <p><b>Email:</b> {user.email}</p>
      <p>Cuenta creada (simulada). Aquí podrías permitir editar perfil, etc.</p>
    </div>
  );
}
