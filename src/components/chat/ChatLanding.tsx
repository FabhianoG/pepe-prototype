import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ChatLanding() {
  const [prompt, setPrompt] = useState("")
  const navigate = useNavigate()

  const handleStart = () => {
    if (!prompt.trim()) return
    navigate("/chat-pepe", { state: { prompt } })
  }

  return (
    <div className="
      flex flex-col items-center justify-center
      min-h-[80vh]
      text-center
      px-4
    ">

      {/* TÍTULO */}
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
        ¿En qué puedo ayudarte hoy?
      </h1>

      <p className="text-gray-500 mt-2 max-w-xl">
        Describe el problema de tu impresora y PEPE AI te ayudará paso a paso.
      </p>

      {/* INPUT PRINCIPAL */}
      <div className="w-full max-w-2xl mt-8">

        <div className="
          flex items-center
          bg-white
          rounded-2xl
          px-5 py-4
          shadow-lg
          border border-gray-200
          focus-within:ring-2 focus-within:ring-[#5aa9e6]/30
        ">

          <input
            type="text"
            placeholder="Ej: mi impresora no imprime a color..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
          />

          {/* BOTÓN → CHAT */}
          <button
            onClick={handleStart}
            className="
              ml-3
              bg-[#5aa9e6]
              text-white
              px-4 py-2
              rounded-xl
              text-sm
              hover:scale-105
              active:scale-95
              transition
              shadow
            "
          >
            Ir al chat
          </button>
        </div>

        {/* SUGERENCIAS */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {[
            "No imprime a color",
            "Problema con WiFi",
            "Error en impresora",
            "Sale borroso",
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => setPrompt(item)}
              className="
                bg-white
                border border-gray-200
                px-4 py-2
                rounded-xl
                text-sm text-gray-600
                hover:bg-gray-100
                transition
              "
            >
              {item}
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}
