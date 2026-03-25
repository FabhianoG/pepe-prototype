import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Building2} from 'lucide-react'

type Empresa = {
  id: number
  nombre: string
  ruc: string
  estado: 'ACTIVO' | 'INACTIVO'
}

// MOCK (luego lo conectas a tu API)
const initialEmpresas: Empresa[] = [
  { id: 1, nombre: 'Protecso', ruc: '20123456789', estado: 'ACTIVO' },
  { id: 2, nombre: 'Misión Tecnológica', ruc: '20987654321', estado: 'ACTIVO' },
]

export default function EmpresasView() {
  const [empresas, setEmpresas] = useState(initialEmpresas)
  const [search, setSearch] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('ALL')
  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
    nombre: '',
    ruc: '',
  })

  // 🔍 FILTRO
  const filteredEmpresas = useMemo(() => {
    return empresas.filter((e) => {
      const matchesSearch =
        e.nombre.toLowerCase().includes(search.toLowerCase()) ||
        e.ruc.includes(search)

      const matchesEstado =
        estadoFilter === 'ALL' || e.estado === estadoFilter

      return matchesSearch && matchesEstado
    })
  }, [empresas, search, estadoFilter])

  const toggleEstado = (id: number) => {
    setEmpresas((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              estado: e.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO',
            }
          : e
      )
    )
  }

  const handleCreate = () => {
    if (!form.nombre || !form.ruc) return

    const newEmpresa: Empresa = {
      id: empresas.length + 1,
      nombre: form.nombre,
      ruc: form.ruc,
      estado: 'ACTIVO',
    }

    setEmpresas([...empresas, newEmpresa])
    setShowModal(false)

    setForm({ nombre: '', ruc: '' })
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">

      {/* CONTENEDOR */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold flex items-center gap-2 text-gray-900">
              <Building2 className="text-purple-600" size={20} />
              Empresas
            </h1>
            <p className="text-gray-500 text-sm">
              Gestión de empresas registradas
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm shadow"
          >
            <Plus size={16} />
            Nueva Empresa
          </button>
        </div>

        {/* FILTROS */}
        <div className="flex flex-wrap gap-3 mb-6">

          <div className="flex items-center border border-gray-200 px-3 py-2 rounded-lg bg-white">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Buscar empresa..."
              className="outline-none ml-2 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={estadoFilter}
            onChange={(e) => setEstadoFilter(e.target.value)}
            className="border border-gray-200 px-3 py-2 rounded-lg text-sm bg-white"
          >
            <option value="ALL">Estado</option>
            <option value="ACTIVO">Activo</option>
            <option value="INACTIVO">Inactivo</option>
          </select>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {filteredEmpresas.map((empresa) => (
            <motion.div
              key={empresa.id}
              whileHover={{ y: -3 }}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-3">

                <div>
                  <h2 className="font-medium text-gray-900">
                    {empresa.nombre}
                  </h2>
                  <p className="text-xs text-gray-500">
                    RUC: {empresa.ruc}
                  </p>
                </div>

                <Building2 className="text-purple-600" size={18} />
              </div>

              <div className="flex justify-between items-center">

                <span
                  className={`px-2 py-1 rounded-md text-xs font-medium ${
                    empresa.estado === 'ACTIVO'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {empresa.estado}
                </span>

                <button
                  onClick={() => toggleEstado(empresa.id)}
                  className="text-xs border border-gray-300 px-2 py-1 rounded-md hover:bg-gray-100"
                >
                  Cambiar estado
                </button>

              </div>
            </motion.div>
          ))}

        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white border border-gray-200 p-6 rounded-xl w-full max-w-md shadow-lg"
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Nueva Empresa
            </h2>

            <div className="space-y-3">

              <input
                placeholder="Nombre empresa"
                className="w-full border border-gray-200 px-3 py-2 rounded-md"
                value={form.nombre}
                onChange={(e) =>
                  setForm({ ...form, nombre: e.target.value })
                }
              />

              <input
                placeholder="RUC"
                className="w-full border border-gray-200 px-3 py-2 rounded-md"
                value={form.ruc}
                onChange={(e) =>
                  setForm({ ...form, ruc: e.target.value })
                }
              />

            </div>

            <div className="flex justify-end gap-2 mt-5">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm"
              >
                Cancelar
              </button>

              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm"
              >
                Crear
              </button>

            </div>

          </motion.div>
        </div>
      )}

    </div>
  )
}
