import avatar from '../assets/avatar.webp'

export default function PepeWelcome() {
  return (
    <div className="flex flex-col items-center text-center gap-6 w-full max-w-xs mx-auto">
      
      {/* 📝 Texto */}
      <div>
        <h2 className="text-4xl font-bold text-[#0f172a]">¡Hola!</h2>
        <p className="text-[#334155] mt-2 text-sm leading-relaxed">
          Soy Pepe, te ayudaré con cualquier problema de tu impresora.
        </p>
      </div>

      {/* 🧑 Avatar */}
      <div className="relative mt-4 flex justify-center items-center">
        
        {/* 🔷 Fondo inclinado */}
        <div
          className="
            absolute
            w-52 h-52
            bg-linear-to-br
            from-[#5aa9e6]/70
            to-[#4e24b1]/70
            rounded-2xl
            rotate-6
            blur-md
          "
        ></div>

        {/* ✨ Glow */}
        <div
          className="
            absolute
            w-56 h-56
            bg-[#5aa9e6]/20
            rounded-full
            blur-2xl
          "
        ></div>

        {/* 🧑 Avatar */}
        <img
          src={avatar}
          alt="Pepe AI"
          className="
            relative
            w-52
            md:w-60
            object-contain
            drop-shadow-[0_25px_50px_rgba(0,0,0,0.2)]
          "
        />
      </div>
    </div>
  )
}
