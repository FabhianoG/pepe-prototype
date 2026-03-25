import { useState, useMemo } from 'react'
import { users as initialUsers } from '../../../services/user.service'
import { getEmpresas } from '../../../services/empresa.service'
import type { User } from '../../../types/user'

export default function UsuariosView() {
  const [usuarios, setUsuarios] = useState<User[]>(initialUsers)
  const [showModal, setShowModal] = useState(false)
  const [success, setSuccess] = useState(false)

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

  // 🔍 FILTROS
  const filteredUsers = useMemo(() => {
    return usuarios.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())

      const matchesRole =
        roleFilter === 'ALL' || u.role === roleFilter

      const matchesEstado =
        estadoFilter === 'ALL' || u.estado === estadoFilter

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

    // mensaje éxito
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)

    setForm({
      name: '',
      lastName: '',
      email: '',
      empresa: '',
      role: 'USER',
    })
  }

  return (
    <div className="space-y-6">

      {/* MENSAJE ÉXITO */}
      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm">
          Usuario creado correctamente
        </div>
      )}

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Usuarios
          </h2>
          <p className="text-sm text-gray-500">
            Gestión de accesos y roles
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-4 py-2 rounded-md text-sm"
        >
          Crear usuario
        </button>
      </div>

      {/* FILTROS */}
      <div className="flex flex-wrap gap-3">
        <input
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md text-sm"
        />

        <select
          value={roleFilter}
          onChange={(e) =>
            setRoleFilter(e.target.value as 'ALL' | 'ADMIN' | 'USER')
          }
          className="border px-3 py-2 rounded-md text-sm"
        >
          <option value="ALL">Todos los roles</option>
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select>

        <select
          value={estadoFilter}
          onChange={(e) =>
            setEstadoFilter(e.target.value as 'ALL' | 'ACTIVO' | 'INACTIVO')
          }
          className="border px-3 py-2 rounded-md text-sm"
        >
          <option value="ALL">Todos los estados</option>
          <option value="ACTIVO">ACTIVO</option>
          <option value="INACTIVO">INACTIVO</option>
        </select>
      </div>

      {/* TABLA */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left">Usuario</th>
              <th className="px-6 py-3 text-center">Empresa</th>
              <th className="px-6 py-3 text-center">Rol</th>
              <th className="px-6 py-3 text-center">Estado</th>
              <th className="px-6 py-3 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">

                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">
                      {user.name} {user.lastName ?? ''}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4 text-center">
                  {user.empresa || '-'}
                </td>

                <td className="px-6 py-4 text-center">
                  <span className={`
                    px-2 py-1 text-xs rounded-md
                    ${
                      user.role === 'ADMIN'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }
                  `}>
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <span className={`
                    px-2 py-1 text-xs rounded-md
                    ${
                      user.estado === 'ACTIVO'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-600'
                    }
                  `}>
                    {user.estado}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => toggleEstado(user.id)}
                    className="text-xs px-3 py-1 border rounded-md"
                  >
                    Estado
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">

            <h3 className="text-lg font-semibold mb-4">
              Crear usuario
            </h3>

            <div className="space-y-4">

              <input
                placeholder="Nombre"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-md text-sm"
              />

              <input
                placeholder="Apellido"
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-md text-sm"
              />

              <input
                placeholder="Correo"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-md text-sm"
              />

              {/* EMPRESA DINÁMICA */}
              <select
                value={form.empresa}
                onChange={(e) =>
                  setForm({ ...form, empresa: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-md text-sm"
              >
                <option value="">Seleccionar empresa</option>

                {empresas.map((emp) => (
                  <option key={emp.id} value={emp.nombre}>
                    {emp.nombre}
                  </option>
                ))}
              </select>

              <select
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value as 'ADMIN' | 'USER',
                  })
                }
                className="w-full border px-3 py-2 rounded-md text-sm"
              >
                <option value="USER">Usuario</option>
                <option value="ADMIN">Administrador</option>
              </select>

            </div>

            <div className="flex justify-end gap-2 mt-6">

              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded-md text-sm"
              >
                Cancelar
              </button>

              <button
                onClick={handleCreateUser}
                className="bg-black text-white px-4 py-2 rounded-md text-sm"
              >
                Crear
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}
