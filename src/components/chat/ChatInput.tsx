import { Mic, Send, User } from 'lucide-react'
import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getPepeResponse } from '../../services/pepe.service'
import { handleTicketFlow, isTicketActive } from '../../services/ticket.service'
import { updateChat, type Chat } from '../../services/chat.service'
import ChatWelcome from './ChatWelcome'
import pepeIcon from '../../assets/icon.png'

type Message = {
  text: string
  sender: 'user' | 'bot'
}

type ChatInputProps = {
  activeChat?: Chat | null
  onChatCreated?: (chat: Chat) => void
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

    const [showWelcome, setShowWelcome] = useState(messages.length === 0)

    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const hasSaved = useRef<boolean>(!!activeChat)
    const chatIdRef = useRef<string | null>(activeChat?.id || null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
      scrollToBottom()
    }, [messages, loading])

    const handleNewChat = () => {
      setMessages([])
      setMessage('')
      setLoading(false)
      hasSaved.current = false
      chatIdRef.current = null
      setShowWelcome(true)
    }

    const generateTicket = () => {
      if (messages.length === 0) {
        setShowWelcome(false)
      }

      const userText = 'ticket'

      const newMessages: Message[] = [
        ...messages,
        { text: 'Quiero generar un ticket de soporte', sender: 'user' },
      ]

      setMessages(newMessages)
      setLoading(true)

      setTimeout(() => {
        const botText = handleTicketFlow(userText) || ''

        const updated: Message[] = [
          ...newMessages,
          { text: botText, sender: 'bot' },
        ]

        setMessages(updated)

        let newChat: Chat | null = null // 🔥 FIX

        if (!hasSaved.current) {
          newChat = {
            id: `chat-${Date.now()}`,
            title: 'Ticket de soporte',
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

        if (newChat) {
          onChatCreated?.(newChat)
        }

        setLoading(false)
      }, 500)
    }

    useImperativeHandle(ref, () => ({
      generateTicket,
      newChat: handleNewChat,
    }))

    const handleSend = () => {
      if (!message.trim()) return

      if (messages.length === 0) {
        setShowWelcome(false)
      }

      const userText = message

      const newMessages: Message[] = [
        ...messages,
        { text: userText, sender: 'user' },
      ]

      setMessages(newMessages)
      setMessage('')
      setLoading(true)

      setTimeout(() => {
        let botText = ''

        if (isTicketActive()) {
          botText = handleTicketFlow(userText) || ''
        } else {
          const ticketResponse = handleTicketFlow(userText)

          if (ticketResponse) {
            botText = ticketResponse
          } else {
            botText = getPepeResponse(userText)
          }
        }

        const updated: Message[] = [
          ...newMessages,
          { text: botText, sender: 'bot' },
        ]

        setMessages(updated)

        let newChat: Chat | null = null // 🔥 FIX

        if (!hasSaved.current) {
          newChat = {
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

        if (newChat) {
          onChatCreated?.(newChat)
        }

        setLoading(false)
      }, 700)
    }

    return (
      <div className="flex flex-col h-full bg-transparent">
        <div
          className={`
    flex-1 overflow-y-auto px-6
    ${showWelcome ? 'flex items-center justify-center' : 'pt-6 pb-32'}
  `}
        >
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{ willChange: 'transform, opacity' }}
              >
                <ChatWelcome />
              </motion.div>
            )}
          </AnimatePresence>

          {!showWelcome && (
            <div
              className="max-w-3xl mx-auto space-y-6"
              style={{ willChange: 'transform' }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-3 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-12 h-12 flex items-center justify-center">
                      <img
                        src={pepeIcon}
                        alt="pepe"
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                  )}

                  <div
                    className={`
                      px-4 py-2.5 rounded-2xl text-sm max-w-[70%]
                      leading-relaxed
                      ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-white/80 border border-slate-200 text-slate-800'
                      }
                    `}
                  >
                    {msg.text}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                      <User size={16} className="text-slate-600" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-end gap-3">
                  <div className="w-9 h-9 flex items-center justify-center">
                    <img
                      src={pepeIcon}
                      alt="pepe"
                      className="w-16 h-16 object-contain"
                    />
                  </div>

                  <div className="bg-white/80 border border-slate-200 rounded-2xl px-4 py-3 flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="sticky bottom-0 px-6 pb-6">
          <div
            className="
              max-w-3xl mx-auto flex items-center gap-2
              bg-white/90
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
