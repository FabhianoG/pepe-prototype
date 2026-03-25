import {
  Users,
  Building2,
  Ticket,
  Activity,
  LayoutDashboard,
} from 'lucide-react'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts'

export default function DashboardView() {
  // 📊 DATA MOCK
  const estadoData = [
    { name: 'Abiertos', value: 10 },
    { name: 'En proceso', value: 8 },
    { name: 'Resueltos', value: 5 },
  ]

  const prioridadData = [
    { name: 'Alta', value: 6 },
    { name: 'Media', value: 10 },
    { name: 'Baja', value: 7 },
  ]

  const ticketsPorDia = [
    { dia: 'Lun', tickets: 5 },
    { dia: 'Mar', tickets: 8 },
    { dia: 'Mié', tickets: 6 },
    { dia: 'Jue', tickets: 10 },
    { dia: 'Vie', tickets: 7 },
  ]

  const COLORS = ['#ef4444', '#f59e0b', '#22c55e']

  return (
    <div className="p-6 bg-gray-50 min-h-full space-y-6">
      {/* HEADER */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="text-purple-600" size={22} />
          <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Métricas del sistema de soporte
        </p>
      </div>

      {/* KPIs */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">Usuarios</p>
            <Users className="text-blue-600" size={18} />
          </div>
          <p className="text-2xl font-semibold mt-2">120</p>
        </div>

        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">Empresas</p>
            <Building2 className="text-purple-600" size={18} />
          </div>
          <p className="text-2xl font-semibold mt-2">8</p>
        </div>

        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">Tickets</p>
            <Ticket className="text-yellow-600" size={18} />
          </div>
          <p className="text-2xl font-semibold mt-2">23</p>
        </div>

        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">Estado</p>
            <Activity className="text-green-600" size={18} />
          </div>
          <p className="text-2xl font-semibold text-green-600 mt-2">Activo</p>
        </div>
      </div>

      {/* GRÁFICOS */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* PIE CHART */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Estado de Tickets
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={estadoData} dataKey="value" outerRadius={80} label>
                {estadoData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Prioridad de Tickets
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={prioridadData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* LINE CHART */}
      <div className="bg-white border rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          Tickets por día
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ticketsPorDia}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dia" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="tickets" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
