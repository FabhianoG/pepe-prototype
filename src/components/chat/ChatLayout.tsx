import ChatHeader from './ChatHeader'
import ChatSidebar from './ChatSidebar'
import ChatInput from './ChatInput'
import type { ChatInputRef } from './ChatInput'
import { useState, useRef, useEffect } from 'react'

export default function ChatLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const chatRef = useRef<ChatInputRef>(null)

  const handleGenerateTicket = () => {
    chatRef.current?.generateTicket()
  }

  const handleToggleFullscreen = () => {
    setIsFullscreen((prev) => !prev)
  }

  // 🔥 bloquea scroll en fullscreen
  useEffect(() => {
    document.body.style.overflow = isFullscreen ? 'hidden' : 'auto'
  }, [isFullscreen])

  return (
    <div
      className={`
    flex flex-col bg-white
    transition-[transform,opacity,border-radius] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
    ${
      isFullscreen
        ? 'fixed inset-0 z-50 w-screen h-screen scale-100 opacity-100 rounded-none'
        : 'w-full h-full scale-[0.96] opacity-90 rounded-2xl'
    }
  `}
    >
      {/* HEADER */}
      <ChatHeader
        onReset={() => window.location.reload()}
        onMenu={() => setSidebarOpen(!sidebarOpen)}
        isOpen={sidebarOpen}
        onGenerateTicket={handleGenerateTicket}
        onToggleFullscreen={handleToggleFullscreen}
        isFullscreen={isFullscreen}
      />

      {/* CONTENIDO */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR (se oculta en fullscreen) */}
        <ChatSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        {/* CHAT */}
        <div className="flex-1 bg-white flex flex-col">
          <ChatInput ref={chatRef} />
        </div>
      </div>
    </div>
  )
}
