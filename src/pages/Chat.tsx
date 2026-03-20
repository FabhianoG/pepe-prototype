import { useEffect, useState } from 'react'
import MainLayout from '../layout/MainLayout'
import WelcomeBanner from '../components/WelcomeBanner'
import StatCard from '../components/StatCard'
import StartChatButton from '../components/StartChatButton'

import { getDashboardData } from '../services/dashboard.service'
import type { DashboardData } from '../types/dashboard'
import type { User } from '../types/user'

export default function Chat() {
  const [data, setData] = useState<DashboardData | null>(null)

  const user: User | null = JSON.parse(localStorage.getItem('user') || 'null')

  useEffect(() => {
    getDashboardData().then(setData)
  }, [])

  if (!user) {
    return <p className="text-center mt-10 text-gray-600">No hay usuario autenticado</p>
  }

  return (
    <MainLayout>
      <div className="w-full py-6 bg-[#f5f9fc]">
        <div className="max-w-6xl mx-auto px-4 space-y-8">

          {/* 👋 BIENVENIDA */}
          <WelcomeBanner name={user.name} />

          {/* 🚀 BOTÓN */}
          <StartChatButton />

          {/* 📊 ESTADÍSTICAS */}
          {!data ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 bg-white/60 animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Consultas" value={data.conversaciones} />
              <StatCard title="Archivos" value={data.archivos} />
              <StatCard title="Diagnósticos" value={data.imagenes} />
            </div>
          )}

          {/* 🤖 SECCIÓN PEPE */}
          <div className="
            bg-white 
            rounded-2xl 
            p-6 
            shadow-sm 
            border border-gray-100
          ">
            <h2 className="text-xl font-semibold text-[#1f3c50]">
              🤖 PEPE AI - Asistente de Impresoras
            </h2>

            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              Diagnóstico, configuración y soporte inteligente para impresoras.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5 text-sm">
              <div className="bg-[#f5f9fc] p-4 rounded-xl hover:shadow-sm transition">
                🖨️ Diagnóstico automático
              </div>
              <div className="bg-[#f5f9fc] p-4 rounded-xl hover:shadow-sm transition">
                ⚙️ Configuración WiFi
              </div>
              <div className="bg-[#f5f9fc] p-4 rounded-xl hover:shadow-sm transition">
                📊 Análisis de uso
              </div>
            </div>
          </div>

          {/* 💡 CONSEJO */}
          <div className="
            bg-linear-to-r
            from-[#c7e6f5] 
            to-[#8fb9e8]
            text-gray-900
            rounded-2xl 
            p-6 
            shadow-sm
          ">
            <h3 className="text-lg font-semibold">💡 Consejo</h3>

            <p className="mt-2 text-sm text-gray-700">
              Limpia los cabezales regularmente para evitar líneas en la impresión.
            </p>
          </div>

        </div>
      </div>
    </MainLayout>
  )
}
