import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop' 
import Auth from './pages/Auth'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Conocenos from './pages/Conocenos'
import Preguntas from './pages/Preguntas'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <>
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/conocenos" element={<Conocenos />} />
        <Route path="/faq" element={<Preguntas />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
