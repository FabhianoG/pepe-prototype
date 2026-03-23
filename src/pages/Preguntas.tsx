import { useState } from 'react'
import MainLayout from '../layout/MainLayout'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: '¿Qué es Pepe AI?',
    answer:
      'Es un asistente inteligente diseñado para ayudarte a automatizar tareas y responder consultas.'
  },
  {
    question: '¿Cómo puedo usarlo?',
    answer:
      'Solo navega al Agente Pepe y comienza a interactuar con el chat.'
  },
]

export default function Preguntas() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <MainLayout>
      <div className="w-full flex justify-center px-4 py-12">
        <div className="max-w-3xl w-full">

          {/* 🧠 HEADER */}
          <div className="text-center">
            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-[#5aa9e6]/10 text-[#0c0c0c]">
              <HelpCircle size={22} />
            </div>

            <h1 className="mt-4 text-4xl font-bold text-[#0f172a]">
              Preguntas Frecuentes
            </h1>

            <p className="text-gray-600 mt-2 text-sm">
              Resolvemos las dudas más comunes sobre Pepe AI.
            </p>
          </div>

          {/* 📦 FAQ LIST */}
          <div className="mt-10 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index

              return (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-xl border rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="font-medium text-[#0f172a]">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`text-gray-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#5aa9e6]' : ''
                      }`}
                    />
                  </button>

                  {/* RESPUESTA */}
                  <div
                    className={`
                      px-5 text-sm text-gray-600
                      transition-all duration-300 ease-in-out
                      ${
                        isOpen
                          ? 'max-h-40 pb-4 opacity-100'
                          : 'max-h-0 opacity-0 overflow-hidden'
                      }
                    `}
                  >
                    {faq.answer}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
