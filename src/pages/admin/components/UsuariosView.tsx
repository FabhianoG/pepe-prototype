import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Power, Shield, Zap } from 'lucide-react'
import { users as initialUsers } from '../../../services/user.service'
import { getEmpresas } from '../../../services/empresa.service'
import type { User } from '../../../types/user'

export default function UsuariosView() {
  const [usuarios, setUsuarios] = useState<User[]>(initialUsers)
  const [showModal, setShowModal] = useState(false)

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [estadoFilter, setEstadoFilter] = useState('ALL')

  const empresas = getEmpresas()

  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    empresa: '',
    role: 'USER' as 'ADMIN' | 'USER',
  })

  const filteredUsers = useMemo(() => {
    return usuarios.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())

      const matchesRole = roleFilter === 'ALL' || u.role === roleFilter
      const matchesEstado = estadoFilter === 'ALL' || u.estado === estadoFilter

      return matchesSearch && matchesRole && matchesEstado
    })
  }, [usuarios, search, roleFilter, estadoFilter])

  const toggleEstado = (id: number) => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              estado: u.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO',
            }
          : u
      )
    )
  }

  const handleCreateUser = () => {
    if (!form.name || !form.email) return

    const newUser: User = {
      id: usuarios.length + 1,
      name: form.name,
      lastName: form.lastName,
      email: form.email,
      password: '123456',
      empresa: form.empresa,
      role: form.role,
      estado: 'ACTIVO',
    }

    setUsuarios([...usuarios, newUser])
    setShowModal(false)

    setForm({
      name: '',
      lastName: '',
      email: '',
      empresa: '',
      role: 'USER',
    })
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">

      {/* CONTENEDOR */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold flex items-center gap-2 text-gray-900">
              <Zap className="text-purple-600" size={20} />
              User Control Panel
            </h1>
            <p className="text-gray-500 text-sm">
              Gestión avanzada de usuarios
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm shadow"
          >
            <Plus size={16} />
            Nuevo Usuario
          </button>
        </div>

        {/* FILTROS */}
        <div className="flex flex-wrap gap-3 mb-6">

          <div className="flex items-center border border-gray-200 px-3 py-2 rounded-lg bg-white">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Buscar..."
              className="outline-none ml-2 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-200 px-3 py-2 rounded-lg text-sm bg-white"
          >
            <option value="ALL">Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>

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

          {filteredUsers.map((user) => (
            <motion.div
              key={user.id}
              whileHover={{ y: -3 }}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-3">

                <div>
                  <h2 className="font-medium text-gray-900">
                    {user.name} {user.lastName}
                  </h2>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                <Shield
                  size={18}
                  className={`${
                    user.role === 'ADMIN'
                      ? 'text-purple-600'
                      : 'text-blue-600'
                  }`}
                />
              </div>

              <div className="flex justify-between text-xs mb-3 text-gray-500">
                <span>Empresa:</span>
                <span className="text-gray-800">{user.empresa || '-'}</span>
              </div>

              <div className="flex justify-between items-center">

                <span
                  className={`px-2 py-1 rounded-md text-xs font-medium ${
                    user.estado === 'ACTIVO'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {user.estado}
                </span>

                <button
                  onClick={() => toggleEstado(user.id)}
                  className="flex items-center gap-1 text-xs border border-gray-300 px-2 py-1 rounded-md hover:bg-gray-100"
                >
                  <Power size={12} />
                  Toggle
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
              Crear Usuario
            </h2>

            <div className="space-y-3">

              <input
                placeholder="Nombre"
                className="w-full border border-gray-200 px-3 py-2 rounded-md"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                placeholder="Apellido"
                className="w-full border border-gray-200 px-3 py-2 rounded-md"
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
              />

              <input
                placeholder="Correo"
                className="w-full border border-gray-200 px-3 py-2 rounded-md"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <select
                className="w-full border border-gray-200 px-3 py-2 rounded-md"
                value={form.empresa}
                onChange={(e) =>
                  setForm({ ...form, empresa: e.target.value })
                }
              >
                <option value="">Empresa</option>
                {empresas.map((emp) => (
                  <option key={emp.id} value={emp.nombre}>
                    {emp.nombre}
                  </option>
                ))}
              </select>

              <select
                className="w-full border border-gray-200 px-3 py-2 rounded-md"
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value as 'ADMIN' | 'USER',
                  })
                }
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>

            </div>

            <div className="flex justify-end gap-2 mt-5">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm"
              >
                Cancelar
              </button>

              <button
                onClick={handleCreateUser}
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
