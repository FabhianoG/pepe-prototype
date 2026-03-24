export default function DashboardView() {
  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Panel general
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Resumen del sistema
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Usuarios</p>
          <p className="text-2xl font-semibold">120</p>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Empresas</p>
          <p className="text-2xl font-semibold">8</p>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Tickets</p>
          <p className="text-2xl font-semibold">23</p>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Estado</p>
          <p className="text-2xl font-semibold text-green-600">Activo</p>
        </div>

      </div>

    </div>
  )
}
