const USERS_KEY = 'tw_users';
const SESSION_KEY = 'tw_session';

function readUsers() { const raw = localStorage.getItem(USERS_KEY); return raw ? JSON.parse(raw) : []; }
function writeUsers(u) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }

function normalizeUser(u) {
  return { ...u, username: u.username.trim().toLowerCase(), email: u.email.trim().toLowerCase() };
}

function ensureDemoUser() {
  const users = readUsers();
  const demo = users.find(u => u.username === 'demo' || u.email === 'demo@demo.com');
  if (!demo) {
    users.push({
      id: crypto.randomUUID(),
      username: 'demo',
      email: 'demo@demo.com',
      passwordHash: btoa('123456'),
      avatar: 'https://i.pravatar.cc/64?img=15',
      createdAt: Date.now(),
    });
    writeUsers(users);
  }
}
ensureDemoUser();

export async function register({ username, email, password, avatar }) {
  const users = readUsers();
  const n = normalizeUser({ username, email });
  const exists = users.some(u => u.email === n.email || u.username === n.username);
  if (exists) throw new Error('Usuario o email ya registrado.');

  const newUser = {
    id: crypto.randomUUID(),
    username: n.username,
    email: n.email,
    passwordHash: btoa(password),
    avatar: avatar?.trim() || `https://i.pravatar.cc/64?u=${encodeURIComponent(n.username)}`,
    createdAt: Date.now(),
  };
  users.push(newUser);
  writeUsers(users);

  const { passwordHash, ...publicUser } = newUser;
  localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
  return publicUser;
}

export async function login({ emailOrUsername, password }) {
  const key = emailOrUsername.trim().toLowerCase();
  const users = readUsers();
  const user = users.find(u => (u.email === key || u.username === key) && u.passwordHash === btoa(password));
  if (!user) throw new Error('Credenciales inválidas.');
  const { passwordHash, ...publicUser } = user;
  localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
  return publicUser;
}

export function logout() { localStorage.removeItem(SESSION_KEY); }
export function getCurrentUser() { const raw = localStorage.getItem(SESSION_KEY); return raw ? JSON.parse(raw) : null; }

// Actualizar perfil (avatar/username/email)
export function updateProfile({ username, email, avatar }) {
  const session = getCurrentUser();
  if (!session) throw new Error('No hay sesión');

  const users = readUsers();
  const idx = users.findIndex(u => u.id === session.id);
  if (idx === -1) throw new Error('Usuario no encontrado');

  const updated = {
    ...users[idx],
    username: username?.trim().toLowerCase() || users[idx].username,
    email: email?.trim().toLowerCase() || users[idx].email,
    avatar: avatar?.trim() || users[idx].avatar,
  };
  users[idx] = updated;
  writeUsers(users);
  const { passwordHash, ...publicUser } = updated;
  localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
  return publicUser;
}
