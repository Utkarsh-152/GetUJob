import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import JobSeeker from './pages/JobSeeker.jsx';
import ReferralGiverRegister from './pages/ReferralGiverRegister.jsx';
import LoginReferralGivers from './pages/LoginReferralGivers.jsx';
import LoginSeeker from './pages/LoginSeeker.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seeker" element={<JobSeeker />} />
        <Route path="/giver" element={<ReferralGiverRegister />} />
        <Route path="/loginReferralGivers" element={<LoginReferralGivers />} />
        <Route path="/loginSeeker" element={<LoginSeeker />} />
      </Routes>
    </Router>
  );
}

export default App;

