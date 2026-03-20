import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Send } from "lucide-react"

export default function PromptBox() {
  const [prompt, setPrompt] = useState("")
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (!prompt.trim()) return
    navigate("/chat-pepe", { state: { prompt } })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="
        bg-white/80 backdrop-blur
        border border-white/40
        shadow-xl
        rounded-2xl
        p-4
      ">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Describe tu problema... (ej: no imprime a color)"
            className="flex-1 bg-transparent outline-none text-gray-700 px-2 py-3"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />

          <button
            onClick={handleSubmit}
            className="
              bg-black text-white p-3 rounded-xl
              hover:scale-105 active:scale-95 transition
            "
          >
            <Send size={16} />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "No imprime a color",
            "Problema con WiFi",
            "Error en impresora",
            "Impresión borrosa",
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => setPrompt(item)}
              className="
                bg-white border border-gray-200
                px-3 py-1.5 rounded-full
                text-xs text-gray-600
                hover:bg-gray-100 transition
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
