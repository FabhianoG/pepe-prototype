import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Search,
  Ticket,
  AlertTriangle,
} from 'lucide-react'

// ✅ TIPOS PRO
type Prioridad = 'ALTA' | 'MEDIA' | 'BAJA'
type Estado = 'ABIERTO' | 'EN_PROCESO' | 'RESUELTO'

type TicketType = {
  id: number
  titulo: string
  impresora: string
  descripcion: string
  prioridad: Prioridad
  estado: Estado
}

const initialTickets: TicketType[] = [
  {
    id: 1,
    titulo: 'No imprime',
    impresora: 'HP LaserJet 1020',
    descripcion: 'La impresora no responde',
    prioridad: 'ALTA',
    estado: 'ABIERTO',
  },
  {
    id: 2,
    titulo: 'Atasco de papel',
    impresora: 'Epson L3150',
    descripcion: 'Se atasca constantemente',
    prioridad: 'MEDIA',
    estado: 'EN_PROCESO',
  },
]

export default function TicketsView() {
  const [tickets, setTickets] = useState<TicketType[]>(initialTickets)
  const [search, setSearch] = useState('')
  const [estadoFilter, setEstadoFilter] = useState<'ALL' | Estado>('ALL')
  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState<{
    titulo: string
    impresora: string
    descripcion: string
    prioridad: Prioridad
  }>({
    titulo: '',
    impresora: '',
    descripcion: '',
    prioridad: 'MEDIA',
  })

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchesSearch =
        t.titulo.toLowerCase().includes(search.toLowerCase()) ||
        t.impresora.toLowerCase().includes(search.toLowerCase())

      const matchesEstado =
        estadoFilter === 'ALL' || t.estado === estadoFilter

      return matchesSearch && matchesEstado
    })
  }, [tickets, search, estadoFilter])

  const changeEstado = (id: number) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              estado:
                t.estado === 'ABIERTO'
                  ? 'EN_PROCESO'
                  : t.estado === 'EN_PROCESO'
                  ? 'RESUELTO'
                  : 'ABIERTO',
            }
          : t
      )
    )
  }

  const handleCreate = () => {
    if (!form.titulo || !form.impresora) return

    const newTicket: TicketType = {
      id: tickets.length + 1,
      ...form,
      estado: 'ABIERTO',
    }

    setTickets([...tickets, newTicket])
    setShowModal(false)

    setForm({
      titulo: '',
      impresora: '',
      descripcion: '',
      prioridad: 'MEDIA',
    })
  }

  const getEstadoStyle = (estado: Estado) => {
    switch (estado) {
      case 'ABIERTO':
        return 'bg-red-100 text-red-700'
      case 'EN_PROCESO':
        return 'bg-yellow-100 text-yellow-700'
      case 'RESUELTO':
        return 'bg-green-100 text-green-700'
    }
  }

  const getPrioridadStyle = (p: Prioridad) => {
    switch (p) {
      case 'ALTA':
        return 'text-red-600'
      case 'MEDIA':
        return 'text-yellow-600'
      case 'BAJA':
        return 'text-green-600'
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              <Ticket className="text-purple-600" size={20} />
              Tickets de Soporte
            </h1>
            <p className="text-gray-500 text-sm">
              Gestión de incidencias de impresoras
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm shadow"
          >
            <Plus size={16} />
            Nuevo Ticket
          </button>
        </div>

        {/* FILTROS */}
        <div className="flex flex-wrap gap-3 mb-6">

          <div className="flex items-center border border-gray-200 px-3 py-2 rounded-lg">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Buscar ticket..."
              className="outline-none ml-2 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={estadoFilter}
            onChange={(e) =>
              setEstadoFilter(e.target.value as 'ALL' | Estado)
            }
            className="border border-gray-200 px-3 py-2 rounded-lg text-sm"
          >
            <option value="ALL">Estado</option>
            <option value="ABIERTO">Abierto</option>
            <option value="EN_PROCESO">En proceso</option>
            <option value="RESUELTO">Resuelto</option>
          </select>

        </div>

        {/* TABLA */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Ticket</th>
                <th className="px-4 py-3 text-left">Impresora</th>
                <th className="px-4 py-3 text-center">Prioridad</th>
                <th className="px-4 py-3 text-center">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredTickets.map((t) => (
                <motion.tr
                  key={t.id}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">
                      {t.titulo}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t.descripcion}
                    </p>
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {t.impresora}
                  </td>

                  {/* 🔥 PRIORIDAD CON ICONO */}
                  <td className="px-4 py-3 text-center font-medium">
                    <div className="flex items-center justify-center gap-1">
                      {t.prioridad === 'ALTA' && (
                        <AlertTriangle size={14} className="text-red-600" />
                      )}
                      <span className={getPrioridadStyle(t.prioridad)}>
                        {t.prioridad}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 text-xs rounded-md ${getEstadoStyle(t.estado)}`}>
                      {t.estado}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => changeEstado(t.id)}
                      className="text-xs border px-3 py-1 rounded-md hover:bg-gray-100"
                    >
                      Cambiar
                    </button>
                  </td>

                </motion.tr>
              ))}
            </tbody>

          </table>
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
            <h2 className="text-lg font-semibold mb-4">
              Crear Ticket
            </h2>

            <div className="space-y-3">

              <input
                placeholder="Título"
                className="w-full border px-3 py-2 rounded-md"
                value={form.titulo}
                onChange={(e) =>
                  setForm({ ...form, titulo: e.target.value })
                }
              />

              <input
                placeholder="Impresora"
                className="w-full border px-3 py-2 rounded-md"
                value={form.impresora}
                onChange={(e) =>
                  setForm({ ...form, impresora: e.target.value })
                }
              />

              <textarea
                placeholder="Descripción"
                className="w-full border px-3 py-2 rounded-md"
                value={form.descripcion}
                onChange={(e) =>
                  setForm({ ...form, descripcion: e.target.value })
                }
              />

              {/* ✅ SIN ANY */}
              <select
                className="w-full border px-3 py-2 rounded-md"
                value={form.prioridad}
                onChange={(e) =>
                  setForm({
                    ...form,
                    prioridad: e.target.value as Prioridad,
                  })
                }
              >
                <option value="BAJA">Baja</option>
                <option value="MEDIA">Media</option>
                <option value="ALTA">Alta</option>
              </select>

            </div>

            <div className="flex justify-end gap-2 mt-5">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-md text-sm"
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
