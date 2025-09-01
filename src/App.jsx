import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="wrapper">
      <div className="container">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
