import { Mic, Send } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { getPepeResponse } from '../services/pepe.service'
import ChatWelcome from './ChatWelcome'

type Message = {
  text: string
  sender: 'user' | 'bot'
}

type ChatInputProps = {
  initialPrompt?: string
}

export default function ChatInput({ initialPrompt = '' }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // ✅ Inicialización COMPLETA (user + bot)
  const [messages, setMessages] = useState<Message[]>(() => {
    if (initialPrompt) {
      return [
        { text: initialPrompt, sender: 'user' },
        {
          text: getPepeResponse(initialPrompt),
          sender: 'bot',
        },
      ]
    }
    return []
  })

  // 🔽 Scroll automático (esto SÍ es válido)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!message.trim()) return

    const userText = message

    const userMessage: Message = {
      text: userText,
      sender: 'user',
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage('')
    setLoading(true)

    setTimeout(() => {
      const response: Message = {
        text: getPepeResponse(userText),
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
    <div className="flex flex-col h-full">

      {/* MENSAJES */}
      <div className="flex-1 overflow-y-auto px-6 py-10">

        {messages.length === 0 ? (
          <ChatWelcome />
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`
                    px-5 py-3 rounded-2xl text-sm leading-relaxed
                    max-w-[75%]
                    ${
                      msg.sender === 'user'
                        ? 'bg-[#5aa9e6] text-white rounded-br-md shadow-md'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm'
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-gray-400 text-sm animate-pulse">
                PEPE está escribiendo...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="px-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <div className="
            flex items-center bg-white rounded-2xl
            px-4 py-3 shadow-lg border border-gray-200
            focus-within:ring-2 focus-within:ring-[#5aa9e6]/30
          ">

            <input
              type="text"
              placeholder="Escribe tu consulta..."
              className="flex-1 bg-transparent outline-none px-2 text-sm text-gray-700"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button className="text-gray-400 hover:text-gray-600">
              <Mic size={18} />
            </button>

            <button
              onClick={handleSend}
              className="
                ml-2 bg-[#5aa9e6] text-white p-2.5 rounded-xl
                hover:scale-105 active:scale-95 transition shadow-md
              "
            >
              <Send size={16} />
            </button>

          </div>
        </div>
      </div>

    </div>
  )
}
