import { Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      {/* 🟢 LANDING PRINCIPAL */}
      <Route path="/home" element={<Home />} />
      
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App
