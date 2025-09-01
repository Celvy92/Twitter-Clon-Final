const TWEETS_KEY = 'tw_tweets';

export function readTweets() {
  const raw = localStorage.getItem(TWEETS_KEY);
  return raw ? JSON.parse(raw) : [];
}
export function writeTweets(tweets) {
  localStorage.setItem(TWEETS_KEY, JSON.stringify(tweets));
}
export function addTweet({ author, avatar, text }) {
  const t = readTweets();
  const newT = {
    id: crypto.randomUUID(),
    author,
    avatar,
    text,
    createdAt: Date.now(),
    likes: 0,
    likedByMe: false,
  };
  const out = [newT, ...t];
  writeTweets(out);
  return out;
}
export function toggleLike(id) {
  const t = readTweets();
  const out = t.map(x => x.id === id ? { ...x, likedByMe: !x.likedByMe, likes: x.likedByMe ? x.likes - 1 : x.likes + 1 } : x);
  writeTweets(out);
  return out;
}

// Seed de demostración (solo si no hay tweets)
export function seedDemoTweets() {
  if (readTweets().length) return;
  const demo = [
    {
      id: crypto.randomUUID(),
      author: 'demo',
      avatar: 'https://i.pravatar.cc/64?img=12',
      text: '¡Bienvenida a tu clon de Twitter! 🚀',
      createdAt: Date.now() - 1000 * 60 * 60,
      likes: 3, likedByMe: false,
    },
    {
      id: crypto.randomUUID(),
      author: 'devf',
      avatar: 'https://i.pravatar.cc/64?img=32',
      text: 'Consejo: prueba el login demo (demo / 123456) y publica tu primer tweet 😎',
      createdAt: Date.now() - 1000 * 60 * 30,
      likes: 5, likedByMe: false,
    },
    {
      id: crypto.randomUUID(),
      author: 'celeste',
      avatar: 'https://i.pravatar.cc/64?img=5',
      text: 'Meta: dejar esto listo para la entrega ✅',
      createdAt: Date.now() - 1000 * 60 * 5,
      likes: 8, likedByMe: false,
    },
  ];
  writeTweets(demo);
}
