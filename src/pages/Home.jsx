import { useEffect, useState } from 'react';
import TweetBox from '../components/TweetBox';
import Tweet from '../components/Tweet';
import useAuth from '../hooks/useAuth';
import { seedDemoTweets, readTweets, addTweet, toggleLike } from '../utils/tweetService';

export default function Home() {
  const { user } = useAuth();
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    seedDemoTweets();
    setTweets(readTweets());
  }, []);

  const handleAdd = (text) => {
    const avatar = user?.avatar || 'https://i.pravatar.cc/64?u=anon';
    const author = user?.username || 'anon';
    const out = addTweet({ author, avatar, text });
    setTweets(out);
  };

  const handleLike = (id) => {
    const out = toggleLike(id);
    setTweets(out);
  };

  return (
    <div className="list">
      <TweetBox onTweet={handleAdd} />
      {tweets.map(t => (
        <Tweet key={t.id} t={t} onLike={handleLike} />
      ))}
    </div>
  );
}
