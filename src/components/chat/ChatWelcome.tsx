import icon from '../../assets/icon.png'

export default function ChatWelcome() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      
      {/* Avatar */}
      <div className="w-32 h-32 rounded-full overflow-hidden bg-white">
        <img
          src={icon}
          alt="Bot"
          className="w-full h-full object-contain"
          style={{
            imageRendering: 'crisp-edges', // mejora bordes en algunos navegadores
          }}
        />
      </div>

      {/* Texto */}
      <p className="mt-4 text-gray-500 max-w-md text-sm leading-relaxed">
        Pregunta lo que quieras sobre impresoras, soporte técnico o análisis.
      </p>

    </div>
  )
}
