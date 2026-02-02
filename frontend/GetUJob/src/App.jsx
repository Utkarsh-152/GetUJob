import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import JobSeeker from './pages/JobSeeker.jsx'
import ReferralGiver from './pages/ReferralGiver.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seeker" element={<JobSeeker />} />
        <Route path="/giver" element={<ReferralGiver />} />
      </Routes>
    </Router>
  )
}

export default App
