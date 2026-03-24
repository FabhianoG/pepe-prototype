import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Building2, Mail, User as UserIcon } from 'lucide-react'
import type { User } from '../../types/user'
import MainLayout from '../../layout/MainLayout'

export default function Profile() {
  const navigate = useNavigate()

  // ✅ Parse seguro
  const user: User | null = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null')
    } catch {
      return null
    }
  }, [])

  // ✅ Redirección si no hay usuario
  useEffect(() => {
    if (!user) navigate('/')
  }, [user, navigate])

  if (!user) return null

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  // ✅ Nombre completo
  const fullName = [user.name, user.lastName].filter(Boolean).join(' ')

  // ✅ Iniciales
  const initials = `${user.name.charAt(0)}${user.lastName?.charAt(0) || ''}`.toUpperCase()

  return (
    <MainLayout>
      <div className="flex justify-center p-6">
        <div className="w-full max-w-3xl">

          {/* 🔷 HEADER */}
          <div className="bg-linear-to-r from-slate-800 to-slate-700 text-white rounded-t-2xl p-6 flex items-center gap-4 shadow-lg">
            
            {/* Avatar */}
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-2xl font-bold shadow-md">
              {initials}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{fullName}</h2>
              <p className="text-sm text-gray-200">{user.email}</p>

              <span className="inline-block mt-1 text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
                Activo
              </span>
            </div>
          </div>

          {/* 🔳 BODY */}
          <div className="bg-white rounded-b-2xl shadow-sm border border-gray-200 p-6 space-y-6">
            
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">
                Información personal
              </h3>

              <button className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                Editar
              </button>
            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Nombre"
                value={user.name}
                icon={<UserIcon size={16} />}
              />

              <Input
                label="Apellido"
                value={user.lastName || 'No especificado'}
                icon={<UserIcon size={16} />}
              />

              <Input
                label="Correo electrónico"
                value={user.email}
                icon={<Mail size={16} />}
                full
              />

              <Input
                label="Empresa"
                value={user.empresa || 'No especificado'}
                icon={<Building2 size={16} />}
                full
              />

              <Input label="País" value="Perú" />
              <Input label="Ciudad" value="Lima" />
            </div>

            {/* FOOTER */}
            <div className="flex justify-end pt-4 border-t">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 border border-red-300 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition"
              >
                <LogOut size={16} />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

/* 🔹 INPUT COMPONENT */
function Input({
  label,
  value,
  icon,
  full = false,
}: {
  label: string
  value: string
  icon?: React.ReactNode
  full?: boolean
}) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <label className="text-sm text-gray-600">{label}</label>

      <div className="mt-1 flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm">
        {icon && <span className="text-gray-400">{icon}</span>}
        <input
          value={value}
          disabled
          className="w-full bg-transparent focus:outline-none"
        />
      </div>
    </div>
  )
}
