import {
  LayoutDashboard,
  Users,
  Building2,
  //Ticket,
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
    //{ icon: Ticket, label: 'Tickets', view: 'tickets' },
    { icon: Settings, label: 'Configuración', view: 'settings' },
  ]

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen w-65
        bg-linear-to-b from-[#abcdff] via-[#7ab7fd] to-[#9eb5ff]
        text-black
        flex flex-col
        border-r border-black/5
        z-50
        transition-transform duration-300

        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
    >
      {/* HEADER */}
      <div className="h-14 flex items-center px-4 font-semibold border-b border-black/10">
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
                transition-all

                ${
                  isActive
                    ? 'bg-white/60 text-black shadow-sm'
                    : 'text-black/70 hover:bg-white/40 hover:text-black'
                }
              `}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-3 border-t border-black/10">
        <button
          onClick={() => {
            localStorage.removeItem('user')
            navigate('/')
          }}
          className="
            w-full flex items-center gap-3
            px-3 py-2
            text-sm
            text-black-500
            hover:bg-white/60
            rounded-md
            transition
          "
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
