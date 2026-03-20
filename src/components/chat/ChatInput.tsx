import { Mic, Send, User, Bot } from 'lucide-react'
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { getPepeResponse } from '../../services/pepe.service'
import ChatWelcome from './ChatWelcome'

type Message = {
  text: string
  sender: 'user' | 'bot'
}

type ChatInputProps = {
  initialPrompt?: string
}

export type ChatInputRef = {
  generateTicket: () => void
}

const ChatInput = forwardRef<ChatInputRef, ChatInputProps>(
({ initialPrompt = '' }, ref) => {

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const [messages, setMessages] = useState<Message[]>(() => {
    if (initialPrompt) {
      return [
        { text: initialPrompt, sender: 'user' },
        { text: getPepeResponse(initialPrompt), sender: 'bot' },
      ]
    }
    return []
  })

  // auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 🎫 FUNCIÓN INTERNA
  const generateTicket = () => {
    const ticketNumber = `TCK-${Math.floor(100000 + Math.random() * 900000)}`

    setMessages((prev) => [
      ...prev,
      { text: 'Quiero generar un ticket de soporte', sender: 'user' },
    ])

    setLoading(true)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: `Ticket generado correctamente.\nNúmero de ticket: ${ticketNumber}\nNuestro equipo se pondrá en contacto contigo pronto.`,
          sender: 'bot',
        },
      ])
      setLoading(false)
    }, 700)
  }

  // 👇 exponemos la función al padre
  useImperativeHandle(ref, () => ({
    generateTicket
  }))

  const handleSend = () => {
    if (!message.trim()) return

    const userText = message

    setMessages((prev) => [...prev, { text: userText, sender: 'user' }])
    setMessage('')
    setLoading(true)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: getPepeResponse(userText), sender: 'bot' },
      ])
      setLoading(false)
    }, 700)
  }

  return (
    <div className="flex flex-col h-full min-h-0">

      <div className="flex-1 overflow-y-auto px-4 py-6 min-h-0">

        {messages.length === 0 ? (
          <ChatWelcome />
        ) : (
          <div className="max-w-2xl mx-auto space-y-4">

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >

                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#5aa9e6] text-white flex items-center justify-center shadow">
                    <Bot size={14} />
                  </div>
                )}

                <div
                  className={`
                    px-4 py-2.5 rounded-xl text-sm leading-relaxed max-w-[75%]
                    ${
                      msg.sender === 'user'
                        ? 'bg-[#5aa9e6] text-white rounded-br-md shadow'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md whitespace-pre-line'
                    }
                  `}
                >
                  {msg.text}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center shadow">
                    <User size={14} />
                  </div>
                )}

              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-gray-400 text-xs animate-pulse">
                <div className="w-7 h-7 rounded-full bg-[#5aa9e6] text-white flex items-center justify-center">
                  <Bot size={14} />
                </div>
                <span>PEPE está escribiendo...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="px-4 pb-4">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center bg-white rounded-xl px-3 py-2 shadow-md border border-gray-200 focus-within:ring-2 focus-within:ring-[#5aa9e6]/30">

            <input
              type="text"
              placeholder="Escribe tu consulta..."
              className="flex-1 bg-transparent outline-none px-2 text-sm text-gray-700"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />

            <button className="text-gray-400 hover:text-gray-600 p-1">
              <Mic size={16} />
            </button>

            <button
              onClick={handleSend}
              className="ml-1 bg-[#5aa9e6] text-white p-2 rounded-lg hover:scale-105 active:scale-95 transition shadow"
            >
              <Send size={14} />
            </button>

          </div>
        </div>
      </div>

    </div>
  )
})

export default ChatInput
