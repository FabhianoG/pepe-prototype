import { MessageSquare, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { getChats, deleteChat, type Chat } from '../../services/chat.service'

type Props = {
  isOpen: boolean
  onClose: () => void
  onNewChat: () => void
  onSelectChat: (chat: Chat) => void
  onDeleteActiveChat: () => void
}

export default function ChatSidebar({
  isOpen,
  onClose,
  onNewChat,
  onSelectChat,
  onDeleteActiveChat
}: Props) {

  const [chats, setChats] = useState<Chat[]>(getChats())

  const refreshChats = () => {
    setChats(getChats())
  }

  const handleDelete = (id: string) => {
    deleteChat(id)
    refreshChats()
    onDeleteActiveChat()
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`
          absolute inset-0 bg-black/20 z-10
          transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      />

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

        <div className="space-y-1.5 text-sm mt-2">

          <button
            onClick={() => {
              onNewChat()
              onClose()
            }}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <MessageSquare size={15} />
            <span className="text-sm">Nuevo chat</span>
          </button>

          <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition">
            <Search size={15} />
            <span className="text-sm">Buscar</span>
          </button>

        </div>

        <div className="mt-4 border-t border-gray-200 pt-3 flex-1 overflow-y-auto">

          <p className="text-[10px] sm:text-xs text-gray-400 font-semibold tracking-wide mb-2">
            CONVERSACIONES
          </p>

          {chats.length === 0 ? (
            <div className="text-xs sm:text-sm text-gray-400 text-center mt-6">
              Sin conversaciones aún.
            </div>
          ) : (
            <div className="space-y-1">
              {chats.map(chat => (
                <div
                  key={chat.id}
                  className="flex justify-between items-center px-2 py-2 rounded-lg hover:bg-gray-100 group"
                >
                  <span
                    onClick={() => {
                      onSelectChat(chat)
                      onClose()
                    }}
                    className="text-sm truncate text-gray-700 cursor-pointer"
                  >
                    {chat.title}
                  </span>

                  <button
                    onClick={() => handleDelete(chat.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  )
}
