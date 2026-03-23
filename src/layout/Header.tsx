import { useState } from 'react'
import { ChevronDown, LogOut, User, Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import icon from '../assets/icon.png'

export default function Header() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.reload()
  }

  return (
    <div className="w-full flex justify-center relative z-1000">
      <header
        className="
        relative z-1000 mt-4
        w-[95%] max-w-6xl
        bg-white/80 backdrop-blur-xl
        border border-white/40
        rounded-2xl shadow-md
        px-4 sm:px-5 py-2
        flex items-center justify-between
      "
      >
        {/* 🔷 IZQUIERDA */}
        <div
          onClick={() => navigate('/home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 flex items-center justify-center group-hover:scale-105 transition">
            <img
              src={icon}
              alt="Pepe AI"
              className="w-16 h-16 object-contain drop-shadow-sm"
            />
          </div>

          <span className="font-semibold text-gray-800 text-base">
            PEPE AI
          </span>
        </div>

        {/* 🧭 NAV DESKTOP */}
        <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center gap-8 text-sm text-gray-600">
          <button
            onClick={() => navigate('/home')}
            className="hover:text-[#5aa9e6] transition font-medium"
          >
            Agente Pepe
          </button>

          <button
            onClick={() => navigate('/conocenos')}
            className="hover:text-[#5aa9e6] transition"
          >
            Conócenos
          </button>

          <button
            onClick={() => navigate('/faq')}
            className="hover:text-[#5aa9e6] transition"
          >
            Preguntas
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="hover:text-[#5aa9e6] transition font-medium"
          >
            Dashboard
          </button>
        </nav>

        {/* 📱 BOTÓN MENU MOBILE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* 🔷 USER DESKTOP */}
        <div className="hidden md:block relative z-1000">
          <button
            onClick={() => setOpen(!open)}
            className="
              flex items-center gap-2
              bg-white/80 backdrop-blur-md
              border border-gray-200/60
              px-2 py-1.5 pr-3
              rounded-full
              hover:bg-white
              transition
              shadow-sm
            "
          >
            <div className="w-8 h-8 bg-linear-to-br from-[#5aa9e6] to-[#4a8fd9] text-white rounded-full flex items-center justify-center text-sm font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>

            <ChevronDown
              size={16}
              className={`transition ${open ? 'rotate-180' : ''}`}
            />
          </button>

          {/* 💎 DROPDOWN MEJORADO */}
          <div
            className={`
              absolute right-0 mt-3 w-60
              bg-white backdrop-blur-xl
              border border-white/30
              rounded-2xl
              shadow-xl shadow-black/5
              overflow-hidden
              transition-all duration-200
              z-9999
              ${
                open
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95 pointer-events-none'
              }
            `}
          >
            {/* HEADER USER */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-semibold text-gray-800 truncate">
                {user?.name || 'Usuario'}
              </p>

              <p
                className="text-xs text-gray-500 truncate mt-0.5"
                title={user?.email}
              >
                {user?.email}
              </p>
            </div>

            {/* OPCIONES */}
            <div className="py-1">
              <button
                onClick={() => navigate('/profile')}
                className="
                  flex items-center gap-2 px-4 py-2.5 w-full
                  text-sm text-gray-700
                  hover:bg-gray-100/70
                  transition
                "
              >
                <User size={16} className="opacity-70" />
                Mi perfil
              </button>

              <button
                onClick={handleLogout}
                className="
                  flex items-center gap-2 px-4 py-2.5 w-full
                  text-sm text-red-500
                  hover:bg-red-50
                  transition
                "
              >
                <LogOut size={16} className="opacity-80" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 📱 MENÚ MOBILE */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm z-900">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white rounded-xl shadow-lg p-4">
            <div className="flex flex-col gap-4 text-gray-700">
              <button onClick={() => navigate('/home')}>
                Agente Pepe
              </button>

              <button onClick={() => navigate('/conocenos')}>
                Conócenos
              </button>

              <button onClick={() => navigate('/faq')}>
                Preguntas
              </button>

              <button onClick={() => navigate('/dashboard')}>
                Dashboard
              </button>

              <hr />

              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2"
              >
                <User size={16} /> Mi perfil
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500"
              >
                <LogOut size={16} /> Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
