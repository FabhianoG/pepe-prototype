import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Plus, Ticket, AlertTriangle, User, Building2 } from 'lucide-react'

// TIPOS
type Prioridad = 'ALTA' | 'MEDIA' | 'BAJA'
type Estado = 'ABIERTO' | 'EN_PROCESO' | 'RESUELTO'

type TicketType = {
  id: number
  titulo: string
  empresa: string
  impresora: string
  descripcion: string
  prioridad: Prioridad
  estado: Estado
  tecnico: string
}

// MOCK (3 HP)
const initialTickets: TicketType[] = [
  {
    id: 1,
    titulo: 'No imprime',
    empresa: 'Empresa 1',
    impresora: 'HP LaserJet 1020',
    descripcion: 'La impresora no responde',
    prioridad: 'ALTA',
    estado: 'ABIERTO',
    tecnico: 'Carlos López',
  },
  {
    id: 2,
    titulo: 'Atasco de papel',
    empresa: 'Empresa 2',
    impresora: 'HP DeskJet 3775',
    descripcion: 'Se atasca constantemente',
    prioridad: 'MEDIA',
    estado: 'EN_PROCESO',
    tecnico: 'Ana Torres',
  },
  {
    id: 3,
    titulo: 'Impresión borrosa',
    empresa: 'Empresa 3',
    impresora: 'HP OfficeJet Pro 9015',
    descripcion: 'Sale con manchas',
    prioridad: 'BAJA',
    estado: 'RESUELTO',
    tecnico: 'Luis Ramírez',
  },
]

export default function TicketsView() {
  const [tickets, setTickets] = useState<TicketType[]>(initialTickets)
  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
    titulo: '',
    empresa: '',
    impresora: '',
    descripcion: '',
    prioridad: 'MEDIA' as Prioridad,
  })

  // FILTRO SIMPLE (opcional)
  const filteredTickets = useMemo(() => tickets, [tickets])

  // CREAR
  const handleCreate = () => {
    if (!form.titulo || !form.empresa || !form.impresora) return

    const newTicket: TicketType = {
      id: tickets.length + 1,
      ...form,
      estado: 'ABIERTO',
      tecnico: 'Pendiente',
    }

    setTickets((prev) => [...prev, newTicket])
    setShowModal(false)

    setForm({
      titulo: '',
      empresa: '',
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
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Ticket className="text-purple-600" size={20} />
            Gestión de Tickets
          </h1>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm shadow"
          >
            <Plus size={16} />
            Nuevo
          </button>
        </div>

        {/* TABLA */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Ticket</th>
                <th className="px-4 py-3 text-left">Empresa</th>
                <th className="px-4 py-3 text-left">Impresora</th>
                <th className="px-4 py-3 text-center">Técnico</th>
                <th className="px-4 py-3 text-center">Prioridad</th>
                <th className="px-4 py-3 text-center">Estado</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredTickets.map((t) => (
                <motion.tr key={t.id} className="hover:bg-gray-50">
                  {/* TICKET */}
                  <td className="px-4 py-3 text-left">
                    <p className="font-medium">{t.titulo}</p>
                    <p className="text-xs text-gray-500">{t.descripcion}</p>
                  </td>

                  {/* EMPRESA */}
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Building2 size={14} />
                      {t.empresa}
                    </div>
                  </td>

                  {/* IMPRESORA */}
                  <td className="px-4 py-3 text-center">{t.impresora}</td>

                  {/* TECNICO */}
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <User size={14} />
                      {t.tecnico}
                    </div>
                  </td>

                  {/* PRIORIDAD */}
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {t.prioridad === 'ALTA' && (
                        <AlertTriangle size={14} className="text-red-600" />
                      )}
                      <span className={getPrioridadStyle(t.prioridad)}>
                        {t.prioridad}
                      </span>
                    </div>
                  </td>

                  {/* ESTADO */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${getEstadoStyle(t.estado)}`}
                    >
                      {t.estado}
                    </span>
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
          <motion.div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Crear Ticket</h2>

            <div className="space-y-3">
              <input
                placeholder="Título"
                className="w-full border px-3 py-2 rounded-md"
                value={form.titulo}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, titulo: e.target.value }))
                }
              />

              <input
                placeholder="Empresa"
                className="w-full border px-3 py-2 rounded-md"
                value={form.empresa}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, empresa: e.target.value }))
                }
              />

              <select
                className="w-full border px-3 py-2 rounded-md"
                value={form.impresora}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, impresora: e.target.value }))
                }
              >
                <option value="">Seleccionar impresora</option>
                <option>HP LaserJet 1020</option>
                <option>HP DeskJet 3775</option>
                <option>HP OfficeJet Pro 9015</option>
              </select>

              <textarea
                placeholder="Descripción"
                className="w-full border px-3 py-2 rounded-md"
                value={form.descripcion}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, descripcion: e.target.value }))
                }
              />

              <select
                className="w-full border px-3 py-2 rounded-md"
                value={form.prioridad}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    prioridad: e.target.value as Prioridad,
                  }))
                }
              >
                <option value="BAJA">Baja</option>
                <option value="MEDIA">Media</option>
                <option value="ALTA">Alta</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowModal(false)}>Cancelar</button>
              <button
                onClick={handleCreate}
                className="bg-purple-600 text-white px-4 py-2 rounded-md"
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
