import icon from '../../assets/icon1.webp'
import { motion } from 'framer-motion'

export default function ChatWelcome() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 0.96,
        transition: {
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{ willChange: 'transform, opacity' }}
      className="flex flex-col items-center justify-center text-center h-full px-4"
    >
      {/* Avatar */}
      <div className="relative w-48 h-48 rounded-full bg-white/80 flex items-center justify-center shadow-xl shadow-blue-500/10 border border-white/40">
        <div className="absolute w-36 h-36 bg-blue-400/10 rounded-full"></div>

        <img
          src={icon}
          alt="Bot"
          className="w-86 h-86 object-contain relative z-10 drop-shadow-xl"
          style={{ imageRendering: 'crisp-edges' }}
        />
      </div>

      <p className="mt-6 text-gray-700 max-w-md text-sm leading-relaxed font-medium">
        Pregunta lo que quieras sobre impresoras, soporte técnico o análisis.
      </p>
    </motion.div>
  )
}
