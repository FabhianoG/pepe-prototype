import { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Menu } from 'lucide-react'

import DashboardView from './components/DashboardView'
import UsuariosView from './components/UsuariosView'
import EmpresasView from './components/EmpresasView'
//import TicketsView from './components/TicketsView'
//import SettingsView from './components/SettingsView'

export default function Admin() {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState('dashboard')

  const renderView = () => {
    switch (view) {
      case 'usuarios':
        return <UsuariosView />
      case 'empresas':
        return <EmpresasView />
      //case 'tickets':
        //return <TicketsView />
      //case 'settings':
        //return <SettingsView />
      default:
        return <DashboardView />
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* SIDEBAR */}
      <Sidebar 
        open={open} 
        setOpen={setOpen} 
        setView={setView}
        currentView={view} 
        />

      {/* OVERLAY MOBILE */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* CONTENIDO */}
      <div className="md:ml-65 flex flex-col min-h-screen">

        {/* HEADER */}
        <header className="
          h-14 flex items-center justify-between
          px-4 md:px-6
          bg-white/80 backdrop-blur
          border-b border-gray-200
          sticky top-0 z-30
        ">
          <div className="flex items-center gap-3">

            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>

            <h1 className="text-sm font-semibold text-gray-900">
              Panel Administrativo
            </h1>

          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1">

          <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">

            {renderView()}

          </div>

        </main>

      </div>
    </div>
  )
}
