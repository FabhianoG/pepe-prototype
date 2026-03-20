import PromptBox from '../components/PromptBox'
import MainLayout from '../layout/MainLayout'
import { Printer, AlertTriangle, Activity, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <MainLayout>
      <div
        className="
        min-h-screen
        flex flex-col items-center
        bg-gradient-to-br
        from-[#c7e6f5]
        via-[#5aa9e6]
        to-[#4e24b1]
        px-4
        relative overflow-hidden
      "
      >
        {/* 🔥 HEADER LOGO */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
          <span className="font-semibold text-white text-lg drop-shadow">
            PEPE AI
          </span>
        </div>

        {/* ✨ EFECTOS */}
        <div className="absolute top-[-120px] right-[-120px] w-80 h-80 bg-[#8b5cf6]/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-120px] left-[-120px] w-80 h-80 bg-[#5aa9e6]/30 rounded-full blur-3xl"></div>

        {/* 🔹 HERO */}
        <div className="relative z-10 text-center max-w-2xl mt-20">
          <h1 className="text-3xl md:text-5xl font-semibold text-[#0f172a] drop-shadow-sm">
            ¿Qué problema quieres resolver?
          </h1>

          <p className="text-[#1f3c50] mt-3 max-w-xl mx-auto text-sm md:text-base">
            Describe el problema de tu impresora{' '}
            <span className="font-semibold text-[#4a8fd9]">PEPE AI</span> te
            ayudará paso a paso.
          </p>

          <div className="mt-10 w-full">
            <PromptBox />
          </div>

          <p className="mt-10 text-xs text-[#1f3c50]/80">
            PEPE AI • Soporte inteligente de impresoras HP
          </p>
        </div>

        {/* 🔻 DASHBOARD */}
        <div className="relative z-10 w-full max-w-6xl mt-20 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* CARD 1 */}
            <div className="bg-white/90 backdrop-blur rounded-2xl p-5 shadow-lg hover:scale-105 transition">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500" />
                <h3 className="font-semibold text-[#0f172a]">Sistema activo</h3>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                PEPE AI funcionando correctamente
              </p>
            </div>

            {/* CARD 2 */}
            <div className="bg-white/90 backdrop-blur rounded-2xl p-5 shadow-lg hover:scale-105 transition">
              <div className="flex items-center gap-3">
                <Printer className="text-blue-500" />
                <h3 className="font-semibold text-[#0f172a]">
                  Impresoras atendidas
                </h3>
              </div>
              <p className="text-2xl font-bold mt-2 text-[#1f3c50]">128</p>
            </div>

            {/* CARD 3 */}
            <div className="bg-white/90 backdrop-blur rounded-2xl p-5 shadow-lg hover:scale-105 transition">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-yellow-500" />
                <h3 className="font-semibold text-[#0f172a]">
                  Problemas frecuentes
                </h3>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Atascos de papel, tinta baja
              </p>
            </div>

            {/* CARD 4 */}
            <div className="bg-white/90 backdrop-blur rounded-2xl p-5 shadow-lg hover:scale-105 transition">
              <div className="flex items-center gap-3">
                <Activity className="text-purple-500" />
                <h3 className="font-semibold text-[#0f172a]">
                  Actividad reciente
                </h3>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                12 consultas en la última hora
              </p>
            </div>
          </div>
        </div>

        {/* 🔻 SOBRE PEPE AI */}
        {/* 🔻 SOBRE PEPE AI (MEJORADO) */}
        <div className="relative z-10 w-full max-w-6xl mb-24 px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* 🧠 TEXTO */}
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
                Un asistente inteligente para tus impresoras
              </h2>

              <p className="mt-4 text-white/80 text-sm md:text-base leading-relaxed">
                <span className="font-semibold text-white">PEPE AI</span> es un
                agente conversacional diseñado para ayudarte a diagnosticar y
                solucionar problemas en impresoras HP de forma rápida, clara y
                sin complicaciones.
              </p>

              <p className="mt-3 text-white/70 text-sm md:text-base">
                Solo describe tu problema y obtén una solución paso a paso en
                segundos.
              </p>
            </div>

            {/* ⚡ FEATURES */}
            <div className="grid gap-4">
              <div
                className="
        bg-white/10
        backdrop-blur-lg
        border border-white/20
        rounded-2xl
        p-5
        hover:bg-white/20
        transition
      "
              >
                <h3 className="text-white font-semibold">
                  Diagnóstico automático
                </h3>
                <p className="text-white/70 text-sm mt-1">
                  Detecta problemas comunes en segundos.
                </p>
              </div>

              <div
                className="
        bg-white/10
        backdrop-blur-lg
        border border-white/20
        rounded-2xl
        p-5
        hover:bg-white/20
        transition
      "
              >
                <h3 className="text-white font-semibold">
                  Soluciones paso a paso
                </h3>
                <p className="text-white/70 text-sm mt-1">
                  Instrucciones claras y fáciles de seguir.
                </p>
              </div>

              <div
                className="
        bg-white/10
        backdrop-blur-lg
        border border-white/20
        rounded-2xl
        p-5
        hover:bg-white/20
        transition
      "
              >
                <h3 className="text-white font-semibold">Disponible 24/7</h3>
                <p className="text-white/70 text-sm mt-1">
                  Soporte en cualquier momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
