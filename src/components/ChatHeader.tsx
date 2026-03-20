import { Menu, Download, Printer, Expand, ShieldCheck, RotateCcw } from 'lucide-react'

type ChatHeaderProps = {
  onReset: () => void;
};

export default function ChatHeader({ onReset }: ChatHeaderProps) {
  return (
    <div className="
      bg-linear-to-r
      from-[#c7e6f5] 
      to-[#8fb9e8]
      text-gray-900
      px-6 py-3 
      rounded-t-2xl 
      flex items-center justify-between
      border-b border-white/40
    ">
      
      {/* IZQUIERDA */}
      <div className="flex items-center gap-3">
        <Menu size={20} className="text-gray-700" />

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
          <h1 className="font-semibold">PEPE AI</h1>
        </div>
      </div>

      {/* DERECHA */}
      <div className="flex items-center gap-3 text-sm">
        
        <span className="flex items-center gap-1 text-gray-700">
          <ShieldCheck size={16} /> Privado y seguro
        </span>

        <button
          onClick={onReset}
          className="bg-white/60 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-white transition border border-white/40"
        >
          <RotateCcw size={16} /> Nuevo chat
        </button>

        <button className="bg-white/60 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-white transition border border-white/40">
          <Download size={16} /> Descargar
        </button>

        <button className="bg-white/60 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-white transition border border-white/40">
          <Printer size={16} /> Imprimir
        </button>

        <button className="bg-white/60 p-2 rounded-lg hover:bg-white transition border border-white/40">
          <Expand size={16} />
        </button>
      </div>
    </div>
  )
}
