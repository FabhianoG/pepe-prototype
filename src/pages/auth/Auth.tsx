import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, X, Send } from 'lucide-react'
import { login } from '../../services/auth.service'
import { useNavigate } from 'react-router-dom'
import icon from '../../assets/icon.webp'
import LoadingScreen from '../../components/LoadingScreen'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [showRecover, setShowRecover] = useState(false)
  const [recoverEmail, setRecoverEmail] = useState('')
  const [recoverSent, setRecoverSent] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const user = login(email, password)

    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      setLoading(true)
    } else {
      alert('Credenciales incorrectas')
    }
  }

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault()

    if (!recoverEmail) {
      alert('Ingresa un correo válido')
      return
    }

    console.log('Enviar recuperación a:', recoverEmail)
    setRecoverSent(true)
  }

  if (loading) {
    return (
      <LoadingScreen
        onFinish={() => {
          const storedUser = JSON.parse(localStorage.getItem('user') || '{}')

          if (storedUser.role === 'ADMIN') {
            navigate('/admin')
          } else {
            navigate('/home')
          }
        }}
      />
    )
  }

  return (
    <div className="min-h-screen flex bg-linear-to-br from-[#eef6fb] to-[#e3edf7]">

      {/* LADO IZQUIERDO */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden bg-linear-to-br from-[#0F3D5E] via-[#1E6F9F] to-[#5aa9e6] text-white items-center justify-center px-10">

        <div className="absolute w-96 h-96 bg-white/10 rounded-full -top-20 -right-20 blur-2xl"></div>
        <div className="absolute w-96 h-96 bg-white/10 rounded-full -bottom-20 -left-20 blur-2xl"></div>

        <div className="z-10 text-center flex flex-col items-center space-y-6">
          <img
            src={icon}
            alt="Pepe AI"
            className="w-64 h-64 object-contain drop-shadow-xl"
          />

          <h2 className="text-4xl font-bold tracking-tight">
            Bienvenido a PEPE
          </h2>

          <p className="text-lg opacity-90 max-w-md">
            Plataforma de gestión inteligente para soluciones tecnológicas
          </p>
        </div>
      </div>

      {/* LADO DERECHO */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">

          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/40">

            <h2 className="text-3xl font-bold text-gray-800 mb-1">
              Iniciar sesión
            </h2>

            <p className="text-gray-500 mb-6 text-sm">
              Accede a tu cuenta
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Correo electrónico
                </label>

                <div className="relative group">
                  <Mail className="absolute left-3 top-3 text-gray-400 group-focus-within:text-[#5aa9e6] transition" size={18} />

                  <input
                    type="email"
                    placeholder="correo@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none 
                    focus:ring-2 focus:ring-[#5aa9e6]/40 focus:border-[#5aa9e6] transition shadow-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Contraseña
                </label>

                <div className="relative group">
                  <Lock className="absolute left-3 top-3 text-gray-400 group-focus-within:text-[#5aa9e6] transition" size={18} />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl outline-none 
                    focus:ring-2 focus:ring-[#5aa9e6]/40 focus:border-[#5aa9e6] transition shadow-sm"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-[#5aa9e6] transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="text-right mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowRecover(true)
                      setRecoverSent(false)
                    }}
                    className="text-sm text-[#5aa9e6] hover:underline"
                  >
                    Recuperar contraseña
                  </button>
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-white 
                bg-linear-to-r from-[#5aa9e6] to-[#4a8fd9]
                hover:scale-[1.02] active:scale-[0.98]
                transition-all shadow-md hover:shadow-lg"
              >
                Iniciar sesión
              </button>

            </form>
          </div>
        </div>
      </div>

      {/* MODAL RECUPERAR */}
      {showRecover && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-2xl">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Recuperar contraseña
              </h3>

              <button
                onClick={() => setShowRecover(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            {!recoverSent ? (
              <form onSubmit={handleRecover} className="space-y-4">

                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18} />

                  <input
                    type="email"
                    placeholder="correo@empresa.com"
                    value={recoverEmail}
                    onChange={(e) => setRecoverEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#5aa9e6]/40"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#5aa9e6] hover:bg-[#4a8fd9] text-white py-2.5 rounded-xl transition"
                >
                  <Send size={16} />
                  Enviar enlace
                </button>

              </form>
            ) : (
              <div className="text-sm text-gray-600 text-center">
                Se ha enviado un enlace de recuperación al correo indicado
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  )
}
