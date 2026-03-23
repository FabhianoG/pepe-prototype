import { MessageSquare, Search } from 'lucide-react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function ChatSidebar({ isOpen, onClose }: Props) {
  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className={`
          absolute inset-0 bg-black/20 z-10
          transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      />

      {/* SIDEBAR */}
      <div
        className={`
          absolute top-0 left-0 h-full
          w-56 sm:w-60           
          z-20
          bg-white
          border-r border-white
          p-3 sm:p-4            
          flex flex-col
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* OPCIONES */}
        <div className="space-y-1.5 text-sm mt-2">

          <button className="
            flex items-center gap-2
            w-full px-3 py-2
            rounded-lg
            hover:bg-gray-100 transition
          ">
            <MessageSquare size={15} />
            <span className="text-sm">Nuevo chat</span>
          </button>

          <button className="
            flex items-center gap-2
            w-full px-3 py-2
            rounded-lg
            hover:bg-gray-100 transition
          ">
            <Search size={15} />
            <span className="text-sm">Buscar</span>
          </button>

        </div>

        {/* CONVERSACIONES */}
        <div className="mt-4 border-t border-gray-200 pt-3 flex-1">

          <p className="
            text-[10px] sm:text-xs
            text-gray-400 font-semibold tracking-wide mb-2
          ">
            CONVERSACIONES
          </p>

          <div className="text-xs sm:text-sm text-gray-400 text-center mt-6">
            Sin conversaciones aún.
          </div>

        </div>
      </div>
    </>
  )
}
