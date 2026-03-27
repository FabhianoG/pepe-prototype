import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Auth from './pages/auth/Auth'
import Admin from './pages/admin/Admin'
import ProtectedRoute from './components/ProtectedRoute'

import {
  Home,
  Conocenos,
  Dashboard,
  Preguntas,
  Profile
} from './pages/users'

import {
  DashboardView,
  UsuariosView,
  EmpresasView,
  //TicketsView,
  SettingsView
} from './pages/admin/components'

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/conocenos" element={<Conocenos />} />
        <Route path="/faq" element={<Preguntas />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardView />} />
          <Route path="usuarios" element={<UsuariosView />} />
          <Route path="empresas" element={<EmpresasView />} />
          {/* <Route path="tickets" element={<TicketsView />} /> */}
          <Route path="settings" element={<SettingsView />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
