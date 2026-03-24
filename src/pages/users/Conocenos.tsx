import MainLayout from '../../layout/MainLayout'
import { Rocket, Lightbulb, Zap, ShieldCheck, Target } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Conocenos() {
  const navigate = useNavigate()

  return (
    <MainLayout>
      <div className="w-full flex justify-center px-4 py-12">
        <div className="max-w-5xl w-full">
          {/* 🧠 HERO */}
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0f172a]">
              Sobre <span className="text-[#181818]">Pepe AI</span>
            </h1>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Automatiza procesos, responde consultas y mejora la experiencia
              digital de tus usuarios con inteligencia artificial moderna.
            </p>
          </div>

          {/* ✨ MISIÓN Y VISIÓN */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {/* MISIÓN */}
            <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-md border hover:shadow-xl transition group">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#5aa9e6]/10 text-[#5aa9e6]">
                <Rocket size={22} />
              </div>

              <h3 className="mt-4 font-semibold text-xl text-[#0f172a]">
                Nuestra misión
              </h3>

              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                Facilitar el acceso a herramientas inteligentes que potencien
                negocios y personas mediante soluciones simples y eficientes.
              </p>
            </div>

            {/* VISIÓN */}
            <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-md border hover:shadow-xl transition group">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#5aa9e6]/10 text-[#5aa9e6]">
                <Lightbulb size={22} />
              </div>

              <h3 className="mt-4 font-semibold text-xl text-[#0f172a]">
                Nuestra visión
              </h3>

              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                Ser una plataforma líder en soluciones AI accesibles, escalables
                y centradas en el usuario.
              </p>
            </div>
          </div>

          {/* 📊 VALORES */}
          <div className="mt-14">
            <h2 className="text-2xl font-semibold text-[#0f172a] text-center">
              Nuestros valores
            </h2>

            <div className="mt-6 grid sm:grid-cols-3 gap-5">
              {/* VALOR 1 */}
              <div className="bg-white/60 backdrop-blur-lg p-5 rounded-xl border text-center hover:shadow-md transition">
                <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-lg bg-[#5aa9e6]/10 text-[#5aa9e6]">
                  <Zap size={18} />
                </div>
                <p className="mt-3 font-medium">Innovación</p>
                <p className="text-xs text-gray-500 mt-1">
                  Siempre evolucionando
                </p>
              </div>

              {/* VALOR 2 */}
              <div className="bg-white/60 backdrop-blur-lg p-5 rounded-xl border text-center hover:shadow-md transition">
                <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-lg bg-[#5aa9e6]/10 text-[#5aa9e6]">
                  <ShieldCheck size={18} />
                </div>
                <p className="mt-3 font-medium">Confianza</p>
                <p className="text-xs text-gray-500 mt-1">
                  Transparencia total
                </p>
              </div>

              {/* VALOR 3 */}
              <div className="bg-white/60 backdrop-blur-lg p-5 rounded-xl border text-center hover:shadow-md transition">
                <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-lg bg-[#5aa9e6]/10 text-[#5aa9e6]">
                  <Target size={18} />
                </div>
                <p className="mt-3 font-medium">Resultados</p>
                <p className="text-xs text-gray-500 mt-1">Enfoque en impacto</p>
              </div>
            </div>
          </div>

          {/* 🧲 CTA */}
          <div className="mt-14 text-center">
            <h3 className="text-xl font-semibold text-[#0f172a]">
              ¿Listo para comenzar?
            </h3>

            <p className="text-gray-600 mt-2 text-sm">
              Empieza ahora con Pepe AI y transforma tu negocio.
            </p>

            <button
              onClick={() => navigate('/home')}
              className="mt-5 px-6 py-2.5 rounded-full bg-[#5aa9e6] text-black hover:bg-[#4a8fd9] transition shadow-md"
            >
              Ir al Agente Pepe
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
