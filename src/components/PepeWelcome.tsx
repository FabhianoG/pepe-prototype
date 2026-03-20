import avatar from '../assets/avatar.png'

export default function PepeWelcome() {
  return (
    <div className="flex flex-col items-start gap-4 w-full max-w-xs">
      
      {/* 📝 Texto */}
      <div>
        <h2 className="text-4xl font-bold text-[#0f172a]">¡Hola!</h2>
        <p className="text-[#1f3c50] mt-2 text-sm leading-relaxed">
          Soy Pepe, te ayudaré con cualquier problema de tu impresora.
        </p>
      </div>

      {/* 🧑 Avatar con fondo decorativo */}
      <div className="relative mt-6">
        
        {/* 🔷 Fondo MÁS GRANDE */}
        <div
          className="
          absolute
          w-56 h-56
          bg-linear-to-br
          from-[#5aa9e6]
          to-[#4e24b1]
          rounded-2xl
          rotate-6
          top-8 left-6
        "
        ></div>

        {/* 🧑 Avatar MÁS GRANDE */}
        <img
          src={avatar}
          alt="Pepe AI"
          className="
            relative
            w-72
            object-contain
            drop-shadow-2xl
          "
        />
      </div>
    </div>
  )
}
