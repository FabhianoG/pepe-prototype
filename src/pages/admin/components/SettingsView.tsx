import { useState } from 'react'
import {
  Settings,
  Bot,
  Shield,
  AlertTriangle,
  Activity,
  Sliders,
  Database,
} from 'lucide-react'

export default function SettingsView() {
  const [settings, setSettings] = useState({
    iaActiva: true,
    autoRespuesta: true,
    maxIntentos: 3,
    escalamientos: true,
    logs: true,
    integracion: true,
    nivelIA: 'medio',
  })

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold flex items-center gap-2 text-gray-900">
            <Settings className="text-purple-600" size={20} />
            Configuración del Sistema
          </h1>
          <p className="text-gray-500 text-sm">
            Control del comportamiento de Pepe IA
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* MOTOR IA */}
          <div className="border border-gray-100 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="text-purple-600" size={18} />
              <h2 className="font-semibold text-gray-800 text-sm tracking-wide">
                Motor IA
              </h2>
            </div>

            <div className="space-y-4">

              <Toggle
                label="IA activa"
                value={settings.iaActiva}
                onClick={() => toggle('iaActiva')}
              />

              <Toggle
                label="Respuestas automáticas"
                value={settings.autoRespuesta}
                onClick={() => toggle('autoRespuesta')}
              />

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Nivel de IA</span>
                <select
                  value={settings.nivelIA}
                  onChange={(e) =>
                    setSettings({ ...settings, nivelIA: e.target.value })
                  }
                  className="border border-gray-200 px-3 py-1.5 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="bajo">Bajo</option>
                  <option value="medio">Medio</option>
                  <option value="alto">Alto</option>
                </select>
              </div>

            </div>
          </div>

          {/* ESCALAMIENTO */}
          <div className="border border-gray-100 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-red-500" size={18} />
              <h2 className="font-semibold text-gray-800 text-sm tracking-wide">
                Escalamiento
              </h2>
            </div>

            <div className="space-y-4">

              <Toggle
                label="Permitir escalamiento"
                value={settings.escalamientos}
                onClick={() => toggle('escalamientos')}
              />

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Máx. intentos IA
                </span>
                <input
                  type="number"
                  value={settings.maxIntentos}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      maxIntentos: Number(e.target.value),
                    })
                  }
                  className="border border-gray-200 px-3 py-1.5 rounded-md w-16 text-sm text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

            </div>
          </div>

          {/* CONTROL */}
          <div className="border border-gray-100 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-green-600" size={18} />
              <h2 className="font-semibold text-gray-800 text-sm tracking-wide">
                Control
              </h2>
            </div>

            <div className="space-y-4">

              <Toggle
                label="Registrar logs"
                value={settings.logs}
                onClick={() => toggle('logs')}
              />

              <Toggle
                label="Integración externa"
                value={settings.integracion}
                onClick={() => toggle('integracion')}
              />

            </div>
          </div>

          {/* MONITOREO */}
          <div className="border border-gray-100 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="text-blue-600" size={18} />
              <h2 className="font-semibold text-gray-800 text-sm tracking-wide">
                Monitoreo
              </h2>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Sliders size={14} className="text-gray-400" />
                <span>
                  Estado del sistema:{' '}
                  <strong className="text-green-600">Activo</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Bot size={14} className="text-gray-400" />
                IA operando correctamente
              </div>

              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-red-400" />
                Escalamientos recientes: 5
              </div>

              <div className="flex items-center gap-2">
                <Database size={14} className="text-gray-400" />
                Logs activos
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-6 flex justify-end">
          <button className="bg-purple-600 hover:bg-purple-700 transition-all text-white px-6 py-2 rounded-lg text-sm shadow-md hover:shadow-lg">
            Guardar cambios
          </button>
        </div>

      </div>
    </div>
  )
}

/* 🔁 Toggle moderno */
type ToggleProps = {
  label: string
  value: boolean
  onClick: () => void
}

function Toggle({ label, value, onClick }: ToggleProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>

      <button
        onClick={onClick}
        className={`w-11 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${
          value ? 'bg-purple-600' : 'bg-gray-300'
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ${
            value ? 'translate-x-5' : ''
          }`}
        />
      </button>
    </div>
  )
}
