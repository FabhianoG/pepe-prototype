import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { login } from '../services/auth.service'
import { useNavigate } from 'react-router-dom'
import icon from '../assets/icon.png'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const user = login(email, password)

    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      navigate("/home")
    } else {
      alert('Credenciales incorrectas ❌')
    }
  }

  return (
    <div className="min-h-screen flex">
      
      {/* 🔵 LADO IZQUIERDO */}
      <div className="hidden md:flex w-1/2 bg-linear-to-r from-[#0F3D5E] to-[#1E6F9F] text-white flex-col justify-center items-center px-10 relative">
        
        <div className="absolute w-72 h-72 bg-white/10 rounded-full top-10 right-10"></div>
        <div className="absolute w-72 h-72 bg-white/10 rounded-full bottom-10 left-10"></div>

        <div className="z-10 text-center flex flex-col items-center">
          
          {/* 🔥 SOLO ICONO (SIN FONDO) */}
          <div className="mb-2 flex justify-center">
            <img
              src={icon}
              alt="Pepe AI"
              className="w-64 h-64 object-contain"
            />
          </div>

          <h2 className="text-4xl font-bold mb-4">
            Bienvenido a PEPE
          </h2>

          <p className="text-lg opacity-90">
            Tu asistente inteligente de Misión Tecnológica
          </p>
        </div>
      </div>

      {/* ⚪ LADO DERECHO */}
      <div className="w-full md:w-1/2 bg-[#f5f9fc] flex items-center justify-center px-6">
        
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Iniciar sesión
          </h2>

          <p className="text-gray-500 mb-6">
            Ingresa tus credenciales para continuar
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Correo electrónico
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />

                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full pl-10 pr-4 py-2.5 
                    bg-[#f5f9fc]
                    border border-gray-200 
                    rounded-xl 
                    outline-none
                    focus:ring-2 focus:ring-[#5aa9e6]/40
                    focus:border-[#5aa9e6]
                    transition
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Contraseña
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    w-full pl-10 pr-10 py-2.5 
                    bg-[#f5f9fc]
                    border border-gray-200 
                    rounded-xl 
                    outline-none
                    focus:ring-2 focus:ring-[#5aa9e6]/40
                    focus:border-[#5aa9e6]
                    transition
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="
                w-full 
                bg-linear-to-r from-[#5aa9e6] to-[#4a8fd9]
                text-white 
                py-2.5 
                rounded-xl 
                font-semibold
                shadow-sm
                hover:shadow-md
                hover:opacity-95
                transition
              "
            >
              Iniciar sesión
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}
