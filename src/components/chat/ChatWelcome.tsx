import icon from '../../assets/icon.png'

export default function ChatWelcome() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      {/* Avatar */}
      <div
        className="
          w-46 h-46
          rounded-full
          bg-white
          flex items-center justify-center
          shadow-lg shadow-black/5
        "
      >
        <img
          src={icon}
          alt="Bot"
          className="w-68 h-68 object-contain"
          style={{
            imageRendering: 'crisp-edges',
          }}
        />
      </div>

      {/* Texto */}
      <p className="mt-4 text-gray-800 max-w-md text-sm leading-relaxed">
        Pregunta lo que quieras sobre impresoras, soporte técnico o análisis.
      </p>
    </div>
  )
}
