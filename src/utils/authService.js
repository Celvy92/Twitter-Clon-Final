const USERS_KEY = 'tw_users';
const SESSION_KEY = 'tw_session';

function readUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}
function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function register({ username, email, password }) {
  const users = readUsers();
  const exists = users.some(u => u.email === email || u.username === username);
  if (exists) throw new Error('Usuario o email ya registrado.');

  const passwordHash = btoa(password);
  const newUser = { id: crypto.randomUUID(), username, email, passwordHash, createdAt: Date.now() };
  users.push(newUser);
  writeUsers(users);

  const { passwordHash: _, ...publicUser } = newUser;
  localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
  return publicUser;
}

export async function login({ emailOrUsername, password }) {
  const users = readUsers();
  const passwordHash = btoa(password);

  const user = users.find(
    u =>
      (u.email === emailOrUsername || u.username === emailOrUsername) &&
      u.passwordHash === passwordHash
  );
  if (!user) throw new Error('Credenciales inválidas.');

  const { passwordHash: _, ...publicUser } = user;
  localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
  return publicUser;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}
