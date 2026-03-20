import { useState } from "react";
import { ChevronDown, LogOut, User, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center pt-4">
      
      <header className="
        w-[95%] max-w-6xl h-16
        bg-[#EAF1F8]
        backdrop-blur-sm
        border border-white/40
        rounded-2xl
        flex items-center justify-between px-6
        shadow-sm
        relative
      ">
        
        {/* 🔷 LOGO */}
        <div 
          onClick={() => navigate('/chat')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="
            w-9 h-9 
            bg-linear-to-br from-[#5aa9e6] to-[#4a8fd9]
            rounded-lg 
            flex items-center justify-center 
            text-white 
            shadow-sm
            group-hover:scale-105
            transition
          ">
            <Bot size={18} strokeWidth={2.5} />
          </div>

          <span className="font-semibold text-gray-800 text-lg">
            PEPE AI
          </span>
        </div>

        {/* 🔷 USUARIO */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="
              flex items-center gap-2 
              bg-white 
              border border-gray-200
              text-gray-800 
              px-3 py-1.5 
              rounded-full 
              hover:bg-gray-50
              transition
              shadow-sm
            "
          >
            <div className="
              w-8 h-8 
              bg-linear-to-br from-[#5aa9e6] to-[#4a8fd9]
              text-white 
              rounded-full 
              flex items-center justify-center 
              font-semibold text-sm
            ">
              {user?.name?.charAt(0) || "U"}
            </div>

            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {/* 🔽 DROPDOWN */}
          {open && (
            <div className="
              absolute right-0 mt-3 w-56
              bg-white 
              text-gray-700 
              rounded-xl 
              shadow-md
              overflow-hidden 
              z-50 
              border border-gray-100
            ">
              
              {/* USER INFO */}
              <div className="px-4 py-3 border-b bg-[#f5f9fc]">
                <p className="font-semibold text-gray-800">
                  {user?.name || "Usuario"}
                </p>
                <p className="text-sm text-gray-500">
                  {user?.email || "correo@email.com"}
                </p>
              </div>

              {/* OPTIONS */}
              <div className="flex flex-col text-sm">
                <button className="
                  flex items-center gap-2 px-4 py-2 
                  hover:bg-gray-50 
                  text-left transition
                ">
                  <User size={16} />
                  Mi perfil
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/";
                  }}
                  className="
                    flex items-center gap-2 px-4 py-2 
                    hover:bg-red-50 
                    text-red-500 
                    text-left transition
                  "
                >
                  <LogOut size={16} />
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
