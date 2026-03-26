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
import { updateChat, type Chat } from '../../services/chat.service'
import ChatWelcome from './ChatWelcome'
import pepeIcon from '../../assets/icon.webp'

type Message = {
  text: string
  sender: 'user' | 'bot'
}

type ChatInputProps = {
  activeChat?: Chat | null
  onChatCreated?: (chat: Chat) => void
}

export type ChatInputRef = {
  newChat: () => void
}

const ChatInput = forwardRef<ChatInputRef, ChatInputProps>(
  ({ activeChat, onChatCreated }, ref) => {
    const initialMessages = activeChat?.messages || []

    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState<Message[]>(initialMessages)

    const showWelcome = messages.length === 0

    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const lastUserRef = useRef<HTMLDivElement | null>(null) // 🔥 NUEVO
    const inputRef = useRef<HTMLInputElement | null>(null)

    const shouldScrollRef = useRef<'bottom' | 'user' | null>(null)

    const hasSaved = useRef<boolean>(!!activeChat)
    const chatIdRef = useRef<string | null>(activeChat?.id || null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const scrollToUser = () => {
      if (!lastUserRef.current) return

      const container = lastUserRef.current.parentElement?.parentElement
      const rect = lastUserRef.current.getBoundingClientRect()

      // 🔥 si está muy arriba o fuera → centrar
      if (rect.top < 100 || rect.bottom > window.innerHeight - 100) {
        lastUserRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      } else {
        // 🔥 si ya está visible → baja un poco
        container?.scrollBy({
          top: 120,
          behavior: 'smooth',
        })
      }
    }

    useEffect(() => {
      if (shouldScrollRef.current === 'bottom') {
        scrollToBottom()
      }

      if (shouldScrollRef.current === 'user') {
        scrollToUser()
      }

      shouldScrollRef.current = null
    }, [messages, loading])

    useEffect(() => {
      inputRef.current?.focus()
    }, [])

    useEffect(() => {
      if (!showWelcome) {
        inputRef.current?.focus()
      }
    }, [messages, showWelcome])

    useEffect(() => {
      const handleTabFocus = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          e.preventDefault()
          inputRef.current?.focus()
        }
      }

      window.addEventListener('keydown', handleTabFocus)
      return () => {
        window.removeEventListener('keydown', handleTabFocus)
      }
    }, [])

    const handleNewChat = () => {
      setMessages([])
      setMessage('')
      setLoading(false)
      hasSaved.current = false
      chatIdRef.current = null
    }

    useImperativeHandle(ref, () => ({
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

      // 🔥 cuando envías → scroll normal
      shouldScrollRef.current = 'bottom'

      setTimeout(() => {
        const botText = getPepeResponse(userText)

        const updated: Message[] = [
          ...newMessages,
          { text: botText, sender: 'bot' },
        ]

        setMessages(updated)

        // 🔥 cuando responde el bot → scroll al user
        shouldScrollRef.current = 'user'

        let newChat: Chat | null = null

        if (!hasSaved.current) {
          newChat = {
            id: `chat-${Date.now()}`,
            title: userText.slice(0, 30),
            messages: updated,
            createdAt: new Date().toISOString(),
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
      }, 1200)
    }

    return (
      <div className="flex flex-col h-full bg-transparent">
        {/* 🔹 MENSAJES */}
        <div
          className={`
            flex-1 overflow-y-auto overflow-x-hidden px-6
            ${showWelcome ? 'flex items-center justify-center' : 'pt-12 pb-32'}
          `}
        >
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChatWelcome />
              </motion.div>
            )}
          </AnimatePresence>

          {!showWelcome && (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg, i) => {
                const isLastUser =
                  msg.sender === 'user' &&
                  i === messages.map((m) => m.sender).lastIndexOf('user')

                return (
                  <motion.div
                    key={i}
                    ref={isLastUser ? lastUserRef : null} // 🔥 AQUÍ
                    initial={{
                      opacity: 0,
                      y: msg.sender === 'user' ? 10 : 20,
                      scale: 0.98,
                    }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.35,
                      delay: i * 0.03,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`flex items-end gap-3 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="w-12 h-12 flex items-center justify-center">
                        <img
                          src={pepeIcon}
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                    )}

                    <div
                      className={`
                        px-4 py-2.5 rounded-2xl text-sm max-w-[70%]
                        leading-relaxed whitespace-pre-wrap wrap-break-word
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
                  </motion.div>
                )
              })}

              {loading && (
                <div className="flex items-end gap-3">
                  <img src={pepeIcon} className="w-16 h-16 object-contain" />
                  <div className="bg-white/80 border border-slate-200 rounded-2xl px-4 py-3 flex items-center gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-[bounce_1.2s_infinite]"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-[bounce_1.2s_infinite] [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-[bounce_1.2s_infinite] [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* 🔹 INPUT */}
        <div className="sticky bottom-0 px-6 pb-6">
          <div className="max-w-3xl mx-auto flex items-center gap-2 bg-white/90 border border-slate-200/60 rounded-2xl px-3 py-2 shadow-sm">
            <input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-3 py-2 text-sm bg-transparent outline-none"
              placeholder="Escribe tu mensaje..."
            />

            <button className="text-slate-400 p-2">
              <Mic size={18} />
            </button>

            <button
              onClick={handleSend}
              className="bg-blue-600 text-white p-2.5 rounded-xl"
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
