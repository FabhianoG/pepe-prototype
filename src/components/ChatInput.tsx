import { Mic, Send, Bot } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { getPepeResponse } from '../services/pepe.service'
import ChatWelcome from './ChatWelcome'

type Message = {
  text: string
  sender: 'user' | 'bot'
}

export default function ChatInput() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = () => {
    if (!message.trim()) return

    const userMessage: Message = {
      text: message,
      sender: 'user',
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage('')
    setLoading(true)

    setTimeout(() => {
      const response: Message = {
        text: getPepeResponse(message),
        sender: 'bot',
      }

      setMessages((prev) => [...prev, response])
      setLoading(false)
    }, 800)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* MENSAJES */}
      <div className="flex-1 overflow-y-auto min-h-0 px-6 py-4 bg-[#f5f9fc]">
        {messages.length === 0 ? (
          <ChatWelcome />
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {/* BOT */}
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-[#5aa9e6] to-[#4a8fd9] flex items-center justify-center text-white shadow-sm">
                    <Bot size={16} />
                  </div>
                )}

                {/* MENSAJE */}
                <div
                  className={`
                    px-4 py-2 rounded-2xl text-sm max-w-[75%] shadow-sm
                    ${
                      msg.sender === 'user'
                        ? 'bg-linear-to-r from-[#5aa9e6] to-[#4a8fd9] text-white rounded-br-sm'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* LOADING */}
            {loading && (
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <div className="w-8 h-8 rounded-full bg-linear-to-r from-[#5aa9e6] to-[#4a8fd9] flex items-center justify-center text-white">
                  <Bot size={16} />
                </div>
                <span className="animate-pulse">
                  PEPE está escribiendo...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="p-4 bg-white border-t shrink-0">
        <div className="flex items-center bg-[#f0f4f8] rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#5aa9e6]/30">
          <input
            type="text"
            placeholder="Escribe tu consulta sobre impresoras..."
            className="flex-1 bg-transparent outline-none px-2 text-sm"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button className="text-gray-400 hover:text-gray-600 transition">
            <Mic size={18} />
          </button>

          <button
            onClick={handleSend}
            className="
              ml-2 
              bg-linear-to-r from-[#5aa9e6] to-[#4a8fd9]
              text-white 
              p-2 rounded-full 
              hover:opacity-90 
              transition
            "
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
