import { useState } from 'react'
import { ChevronDown, LogOut, User, Bot } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="w-full flex justify-center">
      <header
        className="
          relative
          mt-4
          w-[95%] max-w-6xl h-16
          bg-white/80 backdrop-blur-xl
          border border-white/40
          rounded-2xl
          shadow-md
          px-5
          flex items-center justify-between
        "
      >

        {/* 🔷 IZQUIERDA (LOGO) */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="
            w-9 h-9
            bg-linear-to-br from-[#5aa9e6] to-[#4a8fd9]
            rounded-lg flex items-center justify-center
            text-white shadow-sm
            group-hover:scale-105 transition
          ">
            <Bot size={18} />
          </div>

          <span className="font-semibold text-gray-800 text-base">
            PEPE AI
          </span>
        </div>

        {/* 🔥 MENÚ CENTRADO REAL */}
        <nav className="
          absolute left-1/2 transform -translate-x-1/2
          hidden md:flex items-center gap-8
          text-sm text-gray-600
        ">
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

        {/* 🔷 DERECHA (USER) */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="
              flex items-center gap-2
              bg-white/80 border border-gray-200
              px-2 py-1.5 pr-3
              rounded-full
              hover:bg-white transition shadow-sm
            "
          >
            <div className="
              w-8 h-8
              bg-linear-to-br from-[#5aa9e6] to-[#4a8fd9]
              text-white rounded-full
              flex items-center justify-center text-sm
            ">
              {user?.name?.charAt(0) || 'U'}
            </div>

            <ChevronDown
              size={16}
              className={`transition ${open ? 'rotate-180' : ''}`}
            />
          </button>

          {/* DROPDOWN */}
          <div className={`
            absolute right-0 mt-3 w-56
            bg-white rounded-xl shadow-lg border
            overflow-hidden z-50 transition-all
            ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}>
            <div className="px-4 py-3 border-b bg-gray-50">
              <p className="font-semibold">{user?.name || 'Usuario'}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50">
              <User size={16} /> Mi perfil
            </button>

            <button
              onClick={() => {
                localStorage.removeItem('user')
                window.location.href = '/'
              }}
              className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-500"
            >
              <LogOut size={16} /> Cerrar sesión
            </button>
          </div>
        </div>

      </header>
    </div>
  )
}
