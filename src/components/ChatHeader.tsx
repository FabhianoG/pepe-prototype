import {
  Download,
  Printer,
  Expand,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react'
import { resetPepeState } from '../services/pepe.service'

type ChatHeaderProps = {
  onReset: () => void
}

export default function ChatHeader({ onReset }: ChatHeaderProps) {
  return (
    <div
      className="
      flex items-center justify-between
      px-6 py-4
      border-b border-gray-200
      bg-white/70 backdrop-blur
    "
    >
      {/* IZQUIERDA */}
      <div className="flex items-center gap-3">

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
          <h1 className="font-semibold text-gray-800">PEPE AI</h1>
        </div>
      </div>

      {/* DERECHA */}
      <div className="flex items-center gap-3 text-sm">
        <span className="flex items-center gap-1 text-gray-500">
          <ShieldCheck size={16} /> Seguro
        </span>

        <button
          onClick={() => {
            onReset()
            resetPepeState()
          }}
          className="bg-gray-100 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-gray-200 transition"
        >
          <RotateCcw size={16} /> Nuevo
        </button>

        <button className="bg-gray-100 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-gray-200 transition">
          <Download size={16} />
        </button>

        <button className="bg-gray-100 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-gray-200 transition">
          <Printer size={16} />
        </button>

        <button className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition">
          <Expand size={16} />
        </button>
      </div>
    </div>
  )
}
