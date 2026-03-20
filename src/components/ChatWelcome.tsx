import { Bot } from 'lucide-react'

export default function ChatWelcome() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full min-h-75 px-4">
      
      <div className="w-20 h-20 rounded-full bg-linear-to-r from-[#5aa9e6] to-[#4a8fd9] flex items-center justify-center text-white shadow-sm">
        <Bot size={40} />
      </div>

      <h2 className="mt-4 text-xl font-semibold text-[#1f3c50]">
        Hola, soy PEPE AI
      </h2>

      <p className="mt-2 text-gray-600 max-w-md">
        Soy tu asistente inteligente de Misión Tecnológica. Puedo ayudarte con
        información, análisis y soporte tecnológico.
      </p>
    </div>
  )
}
