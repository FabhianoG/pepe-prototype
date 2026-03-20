import {
  Home,
  MessageSquare,
  LogOut,
  Bot,
  ArrowLeft,
} from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  // 🔥 USUARIO
  const user = JSON.parse(localStorage.getItem("user") || "null")
  const initial = user?.name?.charAt(0)?.toUpperCase() || "U"

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/")
  }

  const menuItems = [
    {
      label: "Inicio",
      icon: <Home size={18} />,
      path: "/home",
    },
    {
      label: "Chat",
      icon: <MessageSquare size={18} />,
      path: "/chat-pepe",
    },
    {
      label: "Volver",
      icon: <ArrowLeft size={18} />,
      action: () => navigate(-1),
    },
  ]

  return (
    <div
      className="
        w-20
        h-screen
        bg-white/80 backdrop-blur-xl
        border-r border-gray-200
        flex flex-col
        p-4
        shadow-sm
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-center mb-8">

        {/* 🤖 SOLO ICONO */}
        <div className="
          w-10 h-10
          rounded-xl
          bg-linear-to-r from-[#5aa9e6] to-[#4a8fd9]
          flex items-center justify-center
          text-white
          shadow-md
        ">
          <Bot size={18} />
        </div>

      </div>

      {/* MENÚ */}
      <nav className="flex flex-col gap-2">

        {menuItems.map((item, index) => {
          const isActive =
            item.path && location.pathname === item.path

          return (
            <button
              key={index}
              onClick={() => {
                if (item.action) {
                  item.action()
                } else {
                  navigate(item.path!)
                }
              }}
              className={`
                flex items-center justify-center
                px-3 py-3 rounded-xl
                transition-all duration-200
                ${
                  isActive
                    ? "bg-[#e8f3fb] text-[#4a8fd9] shadow-sm"
                    : "text-gray-600 hover:bg-[#f4f7fb]"
                }
              `}
            >
              {item.icon}
            </button>
          )
        })}

      </nav>

      {/* FOOT */}
      <div className="mt-auto flex flex-col gap-4 items-center">

        {/* 👤 USER */}
        <div className="
          w-10 h-10
          rounded-full
          bg-linear-to-r from-[#5aa9e6] to-[#4a8fd9]
          flex items-center justify-center
          text-white font-semibold
          shadow-md
        ">
          {initial}
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            p-2 rounded-xl
            text-red-500
            hover:bg-red-50
            transition
          "
        >
          <LogOut size={18} />
        </button>

      </div>
    </div>
  )
}
