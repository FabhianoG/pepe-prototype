import {
  Download,
  Printer,
  Expand,
  ShieldCheck,
  RotateCcw,
  Menu,
  X,
  Ticket
} from 'lucide-react'
import { resetPepeState } from '../../services/pepe.service'

type ChatHeaderProps = {
  onReset: () => void
  onMenu: () => void
  isOpen: boolean
  onGenerateTicket: () => void
  onToggleFullscreen: () => void
  isFullscreen: boolean
}

export default function ChatHeader({
  onReset,
  onMenu,
  isOpen,
  onGenerateTicket,
  onToggleFullscreen,
  isFullscreen
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-10">

      {/* IZQUIERDA */}
      <div className="flex items-center gap-2 sm:gap-3">

        <button
          onClick={onMenu}
          className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#5aa9e6] flex items-center justify-center text-white shadow-sm">
          <span className="text-xs sm:text-sm font-bold">P</span>
        </div>

        <div className="leading-tight">
          <h1 className="text-sm sm:text-base font-semibold text-gray-800">
            PEPE AI
          </h1>
          <p className="hidden sm:block text-xs text-gray-400">
            Asistente técnico
          </p>
        </div>

        <span className="hidden md:flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full ml-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Activo
        </span>
      </div>

      {/* DERECHA */}
      <div className="flex items-center gap-1 sm:gap-2">

        {/* SEGURIDAD */}
        <div className="hidden lg:flex items-center gap-1 text-gray-500 bg-gray-100 px-2 py-1 rounded-lg text-xs">
          <ShieldCheck size={14} /> Seguro
        </div>

        {/* 🎫 TICKET */}
        <button
          onClick={onGenerateTicket}
          className="p-2 rounded-lg hover:bg-blue-50 text-gray-500 hover:text-[#5aa9e6] transition"
          title="Generar ticket"
        >
          <Ticket size={16} />
        </button>

        {/* 🔲 FULLSCREEN */}
        <button
          onClick={onToggleFullscreen}
          className="hidden md:block p-2 rounded-lg hover:bg-gray-100 transition"
          title="Pantalla completa"
        >
          {isFullscreen ? <X size={16} /> : <Expand size={16} />}
        </button>

        {/* RESET */}
        <button
          onClick={() => {
            onReset()
            resetPepeState()
          }}
          className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <RotateCcw size={15} />
        </button>

        <button className="hidden sm:block p-2 rounded-lg hover:bg-gray-100 transition">
          <Download size={16} />
        </button>

        <button className="hidden sm:block p-2 rounded-lg hover:bg-gray-100 transition">
          <Printer size={16} />
        </button>

      </div>
    </div>
  )
}
