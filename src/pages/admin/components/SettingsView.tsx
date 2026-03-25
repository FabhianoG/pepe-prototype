import { useState } from 'react'
import {
  Settings,
  User,
  Bell,
  Shield,
  Lock,
  Upload,
  Globe,
  Moon,
  Database,
  Clock,
  Plug,
  FileText,
} from 'lucide-react'

export default function SettingsView() {
  const [settings, setSettings] = useState({
    nombre: 'Admin',
    email: 'admin@empresa.com',
    idioma: 'es',
    zonaHoraria: 'GMT-5',
    notificaciones: true,
    modoOscuro: false,
    seguridad2FA: false,
    password: '',
    newPassword: '',
    autoAsignacion: true,
    logs: true,
    backup: false,
  })

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold flex items-center gap-2 text-gray-900">
            <Settings className="text-purple-600" size={20} />
            Configuración
          </h1>
          <p className="text-gray-500 text-sm">
            Ajustes avanzados del sistema
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* PERFIL */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white">
            <div className="flex items-center gap-2 mb-4">
              <User className="text-blue-600" size={18} />
              <h2 className="font-medium text-gray-900">Perfil</h2>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                IMG
              </div>

              <button className="flex items-center gap-2 text-sm border px-3 py-1 rounded-md">
                <Upload size={14} />
                Cambiar foto
              </button>
            </div>

            <div className="space-y-3">
              <input
                className="w-full border px-3 py-2 rounded-md"
                value={settings.nombre}
                onChange={(e) =>
                  setSettings({ ...settings, nombre: e.target.value })
                }
              />

              <input
                className="w-full border px-3 py-2 rounded-md"
                value={settings.email}
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* SISTEMA */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="text-purple-600" size={18} />
              <h2 className="font-medium text-gray-900">Sistema</h2>
            </div>

            <div className="space-y-4">

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Idioma</span>
                <select
                  value={settings.idioma}
                  onChange={(e) =>
                    setSettings({ ...settings, idioma: e.target.value })
                  }
                  className="border px-2 py-1 rounded-md text-sm"
                >
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                </select>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Clock size={14} />
                  Zona horaria
                </span>
                <select
                  value={settings.zonaHoraria}
                  onChange={(e) =>
                    setSettings({ ...settings, zonaHoraria: e.target.value })
                  }
                  className="border px-2 py-1 rounded-md text-sm"
                >
                  <option value="GMT-5">Perú (GMT-5)</option>
                  <option value="GMT-3">Argentina</option>
                </select>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Moon size={14} />
                  Modo oscuro
                </span>

                <button
                  onClick={() => toggle('modoOscuro')}
                  className={`w-10 h-5 flex items-center rounded-full p-1 ${
                    settings.modoOscuro ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow ${
                      settings.modoOscuro ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>

            </div>
          </div>

          {/* SEGURIDAD */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-green-600" size={18} />
              <h2 className="font-medium text-gray-900">Seguridad</h2>
            </div>

            <div className="space-y-4">

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Autenticación 2FA
                </span>

                <button
                  onClick={() => toggle('seguridad2FA')}
                  className={`w-10 h-5 flex items-center rounded-full p-1 ${
                    settings.seguridad2FA ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow ${
                      settings.seguridad2FA ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Lock size={14} />
                  Cambiar contraseña
                </div>

                <input type="password" placeholder="Actual" className="w-full border px-3 py-2 rounded-md" />
                <input type="password" placeholder="Nueva" className="w-full border px-3 py-2 rounded-md" />
              </div>

            </div>
          </div>

          {/* NOTIFICACIONES */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="text-yellow-600" size={18} />
              <h2 className="font-medium text-gray-900">Notificaciones</h2>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Activar notificaciones
              </span>

              <button
                onClick={() => toggle('notificaciones')}
                className={`w-10 h-5 flex items-center rounded-full p-1 ${
                  settings.notificaciones ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow ${
                    settings.notificaciones ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* TICKETS */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="text-blue-600" size={18} />
              <h2 className="font-medium text-gray-900">Tickets</h2>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Auto-asignar tickets
              </span>

              <button
                onClick={() => toggle('autoAsignacion')}
                className={`w-10 h-5 flex items-center rounded-full p-1 ${
                  settings.autoAsignacion ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow ${
                    settings.autoAsignacion ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* INTEGRACIONES */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white">
            <div className="flex items-center gap-2 mb-4">
              <Plug className="text-indigo-600" size={18} />
              <h2 className="font-medium text-gray-900">Integraciones</h2>
            </div>

            <button className="text-sm border px-3 py-2 rounded-md">
              Conectar con API externa
            </button>
          </div>

          {/* LOGS */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="text-gray-600" size={18} />
              <h2 className="font-medium text-gray-900">Logs del sistema</h2>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Registrar actividad
              </span>

              <button
                onClick={() => toggle('logs')}
                className={`w-10 h-5 flex items-center rounded-full p-1 ${
                  settings.logs ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow ${
                    settings.logs ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* BACKUP */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white">
            <div className="flex items-center gap-2 mb-4">
              <Database className="text-red-600" size={18} />
              <h2 className="font-medium text-gray-900">Backup</h2>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Backup automático
              </span>

              <button
                onClick={() => toggle('backup')}
                className={`w-10 h-5 flex items-center rounded-full p-1 ${
                  settings.backup ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow ${
                    settings.backup ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-6 flex justify-end">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm shadow">
            Guardar cambios
          </button>
        </div>

      </div>

    </div>
  )
}
