export type Message = {
  text: string
  sender: 'user' | 'bot'
}

export type Chat = {
  id: string
  title: string
  messages: Message[]
  createdAt: string
}

const KEY = 'pepe_chats'

// obtener
export const getChats = (): Chat[] => {
  const data = localStorage.getItem(KEY)
  return data ? JSON.parse(data) : []
}

// guardar todos
const saveChats = (chats: Chat[]) => {
  localStorage.setItem(KEY, JSON.stringify(chats))
}

// guardar nuevo chat
export const saveNewChat = (messages: Message[]) => {
  if (messages.length === 0) return

  const chats = getChats()

  const newChat: Chat = {
    id: `chat-${Date.now()}`,
    title: messages[0].text.slice(0, 30),
    messages,
    createdAt: new Date().toISOString(), 
  }

  saveChats([newChat, ...chats])
}

// 🔥 actualizar chat existente
export const updateChat = (id: string, messages: Message[]) => {
  const chats = getChats().map(chat =>
    chat.id === id ? { ...chat, messages } : chat
  )

  saveChats(chats)
}

// eliminar
export const deleteChat = (id: string) => {
  const chats = getChats().filter(c => c.id !== id)
  saveChats(chats)
}
