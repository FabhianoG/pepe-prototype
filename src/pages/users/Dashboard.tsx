import MainLayout from '../../layout/MainLayout'
import { getStats, getTickets } from '../../services/dashboard.service'
import { Eye } from 'lucide-react'

export default function Dashboard() {
  const stats = getStats()
  const tickets = getTickets()

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'resuelto':
        return 'bg-green-100 text-green-600'
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-600'
      case 'en_proceso':
        return 'bg-blue-100 text-blue-600'
      case 'en_pausa':
        return 'bg-gray-200 text-gray-600'
      default:
        return 'bg-gray-100 text-gray-500'
    }
  }

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'alta':
        return 'text-red-500'
      case 'media':
        return 'text-yellow-500'
      case 'baja':
        return 'text-green-500'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <MainLayout>
      <div className="w-full flex justify-center py-6 px-4">
        <div className="w-full max-w-6xl space-y-6">

          {/* HEADER */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Gestión de tickets
              </h2>
              <p className="text-sm text-gray-500">
                Información complementaria al asistente PEPE
              </p>
            </div>

            <div className="bg-white rounded-xl shadow px-4 py-2 text-sm text-gray-600">
              Sistema activo • <span className="text-green-500 font-medium">Online</span>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((item, index) => {
              const Icon = item.icon

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.bg}`}>
                    <Icon className={item.color} size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">{item.title}</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {item.value}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* TABLA */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-3">ID</th>
                    <th>Cliente</th>
                    <th>Problema</th>
                    <th>Impresora</th>
                    <th>Prioridad</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th className="text-right">Acción</th>
                  </tr>
                </thead>

                <tbody>
                  {tickets.map((t) => (
                    <tr
                      key={t.id}
                      className="group border-b hover:bg-blue-50/40 transition cursor-pointer"
                    >
                      <td className="py-3 text-gray-400">{t.id}</td>

                      <td className="text-gray-600">{t.client}</td>

                      <td className="text-gray-700 font-medium group-hover:text-blue-600">
                        {t.problem}
                      </td>

                      <td className="text-gray-500">{t.printer}</td>

                      <td className={`font-medium ${getPriorityStyle(t.priority)}`}>
                        {t.priority}
                      </td>

                      <td>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(t.status)}`}>
                          {t.status}
                        </span>
                      </td>

                      <td className="text-gray-400">{t.date}</td>

                      <td className="text-right">
                        <button className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1 text-blue-500 text-xs hover:underline">
                          <Eye size={14} />
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Pasa el cursor sobre un ticket para ver acciones
            </p>
          </div>

        </div>
      </div>
    </MainLayout>
  )
}
