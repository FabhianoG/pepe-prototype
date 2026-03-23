import { Mic, Send, User, Bot } from 'lucide-react'
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { getPepeResponse } from '../../services/pepe.service'
import { updateChat, type Chat } from '../../services/chat.service'
import ChatWelcome from './ChatWelcome'

type Message = {
  text: string
  sender: 'user' | 'bot'
}

type ChatInputProps = {
  activeChat?: Chat | null
  onChatCreated?: () => void
}

export type ChatInputRef = {
  generateTicket: () => void
  newChat: () => void
}

const ChatInput = forwardRef<ChatInputRef, ChatInputProps>(
  ({ activeChat, onChatCreated }, ref) => {

    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState<Message[]>(
      activeChat?.messages || [],
    )

    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const hasSaved = useRef<boolean>(!!activeChat)
    const chatIdRef = useRef<string | null>(activeChat?.id || null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
      scrollToBottom()
    }, [messages, loading])

    // 🔥 RESTAURADO (CLAVE)
    const handleNewChat = () => {
      setMessages([])
      setMessage('')
      setLoading(false)
      hasSaved.current = false
      chatIdRef.current = null
    }

    const generateTicket = () => {
      const ticketNumber = `TCK-${Math.floor(100000 + Math.random() * 900000)}`

      const newMessages: Message[] = [
        ...messages,
        { text: 'Quiero generar un ticket de soporte', sender: 'user' },
      ]

      setMessages(newMessages)
      setLoading(true)

      setTimeout(() => {
        const updated: Message[] = [
          ...newMessages,
          {
            text: `Ticket generado correctamente.\nNúmero: ${ticketNumber}`,
            sender: 'bot',
          },
        ]

        setMessages(updated)

        if (chatIdRef.current) {
          updateChat(chatIdRef.current, updated)
        }

        setLoading(false)
      }, 700)
    }

    // 🔥 ESTO SOLUCIONA TODO
    useImperativeHandle(ref, () => ({
      generateTicket,
      newChat: handleNewChat,
    }))

    const handleSend = () => {
      if (!message.trim()) return

      const userText = message

      const newMessages: Message[] = [
        ...messages,
        { text: userText, sender: 'user' },
      ]

      setMessages(newMessages)
      setMessage('')
      setLoading(true)

      setTimeout(() => {
        const updated: Message[] = [
          ...newMessages,
          { text: getPepeResponse(userText), sender: 'bot' },
        ]

        setMessages(updated)

        if (!hasSaved.current) {
          const newChat = {
            id: `chat-${Date.now()}`,
            title: userText.slice(0, 30),
            messages: updated,
          }

          const chats = JSON.parse(localStorage.getItem('pepe_chats') || '[]')
          localStorage.setItem(
            'pepe_chats',
            JSON.stringify([newChat, ...chats]),
          )

          chatIdRef.current = newChat.id
          hasSaved.current = true
        } else if (chatIdRef.current) {
          updateChat(chatIdRef.current, updated)
        }

        onChatCreated?.()
        setLoading(false)
      }, 700)
    }

    return (
      <div className="flex flex-col h-full bg-transparent">

        <div className="flex-1 overflow-y-auto px-6 py-24 pb-32">
          {messages.length === 0 ? (
            <ChatWelcome />
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-3 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot size={16} className="text-blue-600" />
                    </div>
                  )}

                  <div
                    className={`
                      px-4 py-2.5 rounded-2xl text-sm max-w-[70%]
                      leading-relaxed
                      ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-white/80 border border-slate-200 text-slate-800 backdrop-blur-[2px]'
                      }
                    `}
                  >
                    {msg.text}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center">
                      <User size={16} className="text-slate-600" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="text-xs text-slate-400 pl-2 animate-pulse">
                  PEPE está escribiendo...
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* INPUT (MISMO ESTILO) */}
        <div className="sticky bottom-0 px-6 pb-6">
          <div
            className="
              max-w-3xl mx-auto flex items-center gap-2
              bg-white/80 backdrop-blur-md
              border border-slate-200/60
              rounded-2xl px-3 py-2
              shadow-sm
            "
          >
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              className="
                flex-1 px-3 py-2 text-sm
                bg-transparent outline-none
                text-slate-800
                placeholder:text-slate-400
              "
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />

            <button className="text-slate-400 hover:text-slate-600 p-2 transition">
              <Mic size={18} />
            </button>

            <button
              onClick={handleSend}
              className="
                bg-blue-600 hover:bg-blue-700
                text-white p-2.5 rounded-xl
                transition
              "
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    )
  },
)

export default ChatInput
