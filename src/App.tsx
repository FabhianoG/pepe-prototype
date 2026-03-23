import { Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Conocenos from './pages/Conocenos'
import Preguntas from './pages/Preguntas'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      {/*LANDING PRINCIPAL */}
      <Route path="/home" element={<Home />} />
      {/*PERFIL */}
      <Route path="/profile" element={<Profile />} />

      {/*NUEVAS VISTAS */}
      <Route path="/conocenos" element={<Conocenos />} />
      <Route path="/faq" element={<Preguntas />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
