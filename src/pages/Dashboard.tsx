import MainLayout from '../layout/MainLayout'
import { getStats, getTickets, getActivity } from '../services/dashboard.service'
import { Activity, Printer, CheckCircle, AlertTriangle } from 'lucide-react'

export default function Dashboard() {
  const stats = getStats()
  const tickets = getTickets()
  const activities = getActivity()

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'resuelto':
        return 'bg-green-100 text-green-600'
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-600'
      case 'critico':
        return 'bg-red-100 text-red-600'
      default:
        return 'bg-gray-100 text-gray-500'
    }
  }

  return (
    <MainLayout>
      <div className="p-6 max-w-7xl mx-auto">

        {/* 🔷 HEADER PRO */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Dashboard 🤖
            </h1>
            <p className="text-gray-500 mt-1">
              Monitoreo inteligente de tickets e impresoras con Pepe AI
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/40 px-4 py-2 rounded-xl shadow-sm text-sm text-gray-600">
            Sistema activo • <span className="text-green-500 font-medium">Online</span>
          </div>
        </div>

        {/* 🔷 STATS PRO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon

            return (
              <div
                key={index}
                className="
                  group
                  bg-white/70 backdrop-blur-xl
                  border border-white/40
                  rounded-2xl
                  p-5
                  shadow-sm hover:shadow-lg
                  transition-all duration-300
                  hover:-translate-y-1
                "
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      {item.title}
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-800 mt-1">
                      {item.value}
                    </h2>
                  </div>

                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.bg}`}>
                    <Icon className={`${item.color} group-hover:scale-110 transition`} size={22} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* 🔷 CONTENIDO */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* 🧠 ACTIVIDAD */}
          <div className="
            bg-white/70 backdrop-blur-xl
            border border-white/40
            rounded-2xl
            p-6
            shadow-sm
          ">
            <h3 className="font-semibold text-gray-800 mb-5 text-lg">
              Actividad del Agente Pepe
            </h3>

            <div className="space-y-4">
              {activities.map((act, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 text-sm text-gray-600"
                >
                  <div className="mt-1">
                    {act.type === 'success' && <CheckCircle size={18} className="text-green-500" />}
                    {act.type === 'warning' && <Printer size={18} className="text-yellow-500" />}
                    {act.type === 'error' && <AlertTriangle size={18} className="text-red-500" />}
                    {act.type === 'info' && <Activity size={18} className="text-blue-500" />}
                  </div>

                  <p className="leading-relaxed">{act.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 🎫 TICKETS */}
          <div className="
            bg-white/70 backdrop-blur-xl
            border border-white/40
            rounded-2xl
            p-6
            shadow-sm
          ">
            <h3 className="font-semibold text-gray-800 mb-5 text-lg">
              Tickets recientes
            </h3>

            <div className="space-y-4">
              {tickets.map((t) => (
                <div
                  key={t.id}
                  className="
                    flex justify-between items-center
                    p-3 rounded-xl
                    hover:bg-gray-50/70
                    transition
                  "
                >
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {t.problem}
                    </p>
                    <p className="text-xs text-gray-400">
                      {t.printer} • {t.id}
                    </p>
                  </div>

                  <span
                    className={`
                      text-xs px-3 py-1 rounded-full font-medium
                      ${getStatusStyle(t.status)}
                    `}
                  >
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </MainLayout>
  )
}
