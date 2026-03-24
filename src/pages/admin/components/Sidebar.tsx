import {
  LayoutDashboard,
  Users,
  Building2,
  Ticket,
  Settings,
  LogOut,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type SidebarProps = {
  open: boolean
  setOpen: (value: boolean) => void
  setView: (view: string) => void
  currentView: string
}

export default function Sidebar({
  open,
  setOpen,
  setView,
  currentView,
}: SidebarProps) {
  const navigate = useNavigate()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard' },
    { icon: Users, label: 'Usuarios', view: 'usuarios' },
    { icon: Building2, label: 'Empresas', view: 'empresas' },
    { icon: Ticket, label: 'Tickets', view: 'tickets' },
    { icon: Settings, label: 'Configuración', view: 'settings' },
  ]

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen w-65
        bg-[#0B1E2D] text-gray-300
        flex flex-col
        border-r border-white/5
        z-50
        transition-transform duration-300

        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
    >
      {/* HEADER */}
      <div className="h-14 flex items-center px-4 text-white font-semibold border-b border-white/5">
        PEPE SYSTEM
      </div>

      {/* MENU */}
      <nav className="flex-1 px-2 py-2 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          const isActive = currentView === item.view

          return (
            <button
              key={index}
              onClick={() => {
                setView(item.view)
                setOpen(false)
              }}
              className={`
                w-full flex items-center gap-3
                px-3 py-2
                rounded-md text-sm
                transition

                ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-3 border-t border-white/5">
        <button
          onClick={() => {
            localStorage.removeItem('user')
            navigate('/')
          }}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md transition"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
