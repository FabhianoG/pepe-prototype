import MainLayout from '../../layout/MainLayout'
import { getStats} from '../../services/dashboard.service'

export default function Dashboard() {
  const stats = getStats()
  
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
        </div>
      </div>
    </MainLayout>
  )
}
