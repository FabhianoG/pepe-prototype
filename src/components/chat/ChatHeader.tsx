import {
  Download,
  Printer,
  Expand,
  RotateCcw,
  Menu,
  X,
  Headphones
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

  const btn =
    "p-2 rounded-lg bg-gray-50 hover:bg-gray-100 active:scale-95 transition shadow-sm"

  return (
    <header className="
      w-full
      flex items-center justify-between
      px-3 sm:px-4 md:px-6
      py-2.5 sm:py-3
      border-b border-gray-200/60
      bg-white/80 backdrop-blur-xl
      sticky top-0 z-10
    ">

      {/* IZQUIERDA */}
      <div className="flex items-center sm:gap-3 min-w-0">

        <button onClick={onMenu} className={`${btn} mr-4`}>
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="leading-tight truncate">
          <h1 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
            PEPE AI
          </h1>
          <p className="hidden sm:block text-xs text-gray-400">
            Asistente técnico
          </p>
        </div>

        <span className="
          hidden md:flex items-center gap-1
          text-xs text-green-600
          bg-green-50 px-2 py-0.5
          rounded-full ml-1
        ">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Activo
        </span>
      </div>

      {/* CENTRO */}
      <div className="
        flex-1 flex justify-center
        px-2 sm:px-4
      ">
        <button
          onClick={onGenerateTicket}
          className="
            flex items-center gap-2
            px-3 sm:px-4 py-2
            rounded-lg
            bg-gray-50 hover:bg-gray-100
            active:scale-95
            transition shadow-sm
            text-gray-700 hover:text-[#5aa9e6]
            text-sm font-medium
            whitespace-nowrap
          "
        >
          <Headphones size={16} />
          <span className="hidden sm:inline">
            Soporte técnico
          </span>
        </button>
      </div>

      {/* DERECHA */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">

        {/* Fullscreen */}
        <button
          onClick={onToggleFullscreen}
          className={`${btn} hidden md:flex`}
        >
          {isFullscreen ? <X size={16} /> : <Expand size={16} />}
        </button>

        {/* Reset */}
        <button
          onClick={() => {
            onReset()
            resetPepeState()
          }}
          className={btn}
        >
          <RotateCcw size={15} />
        </button>

        {/* Download */}
        <button className={`${btn} hidden sm:flex`}>
          <Download size={16} />
        </button>

        {/* Print */}
        <button className={`${btn} hidden sm:flex`}>
          <Printer size={16} />
        </button>

      </div>
    </header>
  )
}
