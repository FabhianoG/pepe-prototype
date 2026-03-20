import { Bot } from 'lucide-react'

export default function ChatWelcome() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      
      <div className="w-20 h-20 rounded-full bg-[#5aa9e6] flex items-center justify-center text-white">
        <Bot size={40} />
      </div>

      <p className="mt-3 text-gray-500 max-w-md">
        Pregunta lo que quieras sobre impresoras, soporte técnico o análisis.
      </p>

    </div>
  )
}
