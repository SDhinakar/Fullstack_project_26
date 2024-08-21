import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login.js';
import LandingPage from './LandingPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/LandingPage" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
