import ChatHeader from './ChatHeader'
import ChatSidebar from './ChatSidebar'
import ChatInput from './ChatInput'
import type { ChatInputRef } from './ChatInput'
import { useState, useRef, useEffect } from 'react'
import type { Chat } from '../../services/chat.service'

// 🔥 IMPORTS NUEVOS (CLAVE)
import { resetPepeState } from '../../services/pepe.service'
import { resetTicketState } from '../../services/ticket.service'

export default function ChatLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeChat, setActiveChat] = useState<Chat | null>(null)

  const [refreshKey, setRefreshKey] = useState(0)

  const chatRef = useRef<ChatInputRef>(null)

  const handleGenerateTicket = () => {
    chatRef.current?.generateTicket()
  }

  // 🔥 FIX PRINCIPAL
  const handleNewChat = () => {
    chatRef.current?.newChat()
    setActiveChat(null)

    // ✅ LIMPIA ESTADOS GLOBALES
    resetPepeState()
    resetTicketState()
  }

  // 🔥 FIX TAMBIÉN AQUÍ
  const handleDeleteActiveChat = () => {
    chatRef.current?.newChat()
    setActiveChat(null)

    // ✅ LIMPIA ESTADOS GLOBALES
    resetPepeState()
    resetTicketState()

    setRefreshKey((prev) => prev + 1)
  }

  const handleChatCreated = (chat: Chat) => {
    setRefreshKey((prev) => prev + 1)

    // 🔥 AUTO-SELECCIONAR NUEVO CHAT
    setActiveChat(chat)
  }

  const handleToggleFullscreen = () => {
    setIsFullscreen((prev) => !prev)
  }

  useEffect(() => {
    document.body.style.overflow = isFullscreen ? 'hidden' : 'auto'
  }, [isFullscreen])

  return (
    <div
      className={`
        flex flex-col
        bg-linear-to-b from-[#f8fbff] via-[#eef2ff] to-[#e0e7ff]
        overflow-hidden
        ${
          isFullscreen
            ? 'fixed inset-0 z-9999 w-screen h-screen rounded-none'
            : 'w-full h-full rounded-2xl'
        }
      `}
    >
      <ChatHeader
        onReset={handleNewChat}
        onMenu={() => setSidebarOpen(!sidebarOpen)}
        isOpen={sidebarOpen}
        onGenerateTicket={handleGenerateTicket}
        onToggleFullscreen={handleToggleFullscreen}
        isFullscreen={isFullscreen}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <ChatSidebar
          key={refreshKey}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNewChat={handleNewChat}
          onSelectChat={(chat) => {
            setActiveChat(chat)
            setSidebarOpen(false)

            // 🔥 BONUS (IMPORTANTE)
            // Evita heredar estados al cambiar de chat
            resetPepeState()
            resetTicketState()
          }}
          onDeleteActiveChat={handleDeleteActiveChat}
          activeChatId={activeChat?.id || null}
        />

        <div className="flex-1 flex flex-col">
          <ChatInput
            key={activeChat?.id || 'new'}
            ref={chatRef}
            activeChat={activeChat}
            onChatCreated={handleChatCreated}
          />
        </div>
      </div>
    </div>
  )
}
