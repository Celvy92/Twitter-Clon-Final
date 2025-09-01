import { useState } from 'react';
import TweetBox from '../components/TweetBox';

export default function Home() {
  const [tweets, setTweets] = useState([
    { id: 1, author: 'demo', text: 'Hola Twitter Clone 👋', createdAt: Date.now() }
  ]);

  const addTweet = (text, author) => {
    setTweets(t => [{ id: crypto.randomUUID(), author, text, createdAt: Date.now() }, ...t]);
  };

  return (
    <div className="list">
      <TweetBox onTweet={addTweet} />
      {tweets.map(t => (
        <article key={t.id} className="card tweet">
          <div className="author">@{t.author}</div>
          <div>{t.text}</div>
        </article>
      ))}
    </div>
  );
}
