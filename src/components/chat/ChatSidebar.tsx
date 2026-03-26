import { MessageSquare, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { getChats, deleteChat, type Chat } from '../../services/chat.service'

type Props = {
  isOpen: boolean
  onClose: () => void
  onNewChat: () => void
  onSelectChat: (chat: Chat) => void
  onDeleteActiveChat: () => void
  activeChatId?: string | null
}

export default function ChatSidebar({
  isOpen,
  onClose,
  onNewChat,
  onSelectChat,
  onDeleteActiveChat,
  activeChatId,
}: Props) {
  const [chats, setChats] = useState<Chat[]>(getChats())

  const refreshChats = () => {
    setChats(getChats())
  }

  const handleDelete = (id: string) => {
    deleteChat(id)
    refreshChats()

    if (id === activeChatId) {
      onDeleteActiveChat()
    }
  }

  // 🔥 TRUNCATE DINÁMICO
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + '...'
  }

  const formatDateTime = (date?: string) => {
    if (!date) return ''

    const d = new Date(date)
    const today = new Date()

    const isToday =
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()

    const time = d.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })

    if (isToday) return `Hoy, ${time}`

    const fullDate = d.toLocaleDateString()

    return `${fullDate}, ${time}`
  }

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
          w-64 sm:w-72
          z-20
          bg-white
          border-r border-gray-200
          p-3 sm:p-4
          flex flex-col
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* ACCIONES */}
        <div className="space-y-2 text-sm mt-2">
          <button
            onClick={() => {
              onNewChat()
              onClose()
            }}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <MessageSquare size={16} />
            <span>Nuevo chat</span>
          </button>

          <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition">
            <Search size={16} />
            <span>Buscar</span>
          </button>
        </div>

        {/* LISTA */}
        <div className="mt-4 border-t border-gray-200 pt-3 flex-1 overflow-y-auto pr-1">
          <p className="text-xs text-gray-400 font-semibold tracking-wide mb-2">
            CONVERSACIONES
          </p>

          {chats.length === 0 ? (
            <div className="text-sm text-gray-400 text-center mt-6">
              Sin conversaciones aún.
            </div>
          ) : (
            <div className="space-y-1">
              {chats.map((chat) => {
                const isActive = chat.id === activeChatId

                return (
                  <div
                    key={chat.id}
                    className={`
                      flex justify-between items-start px-3 py-2 rounded-lg group cursor-pointer transition
                      ${
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-gray-100 text-gray-700'
                      }
                    `}
                  >
                    {/* TEXTO */}
                    <div
                      onClick={() => {
                        onSelectChat(chat)
                        onClose()
                      }}
                      className="flex flex-col flex-1 cursor-pointer"
                    >
                      <span
                        className={`
                          text-sm leading-tight wrap-break-word
                          ${
                            isActive
                              ? 'font-semibold text-blue-700 truncate'
                              : 'line-clamp-2 text-gray-700'
                          }
                        `}
                      >
                        {isActive
                          ? truncateText(chat.title, 26) // 🔥 ACTIVO
                          : truncateText(chat.title, 60)} {/* 🔥 NORMAL */}
                      </span>

                      <span className="text-[11px] text-gray-400 mt-1">
                        {formatDateTime(chat.createdAt)}
                      </span>
                    </div>

                    {/* DELETE */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(chat.id)
                      }}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition ml-2 mt-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
