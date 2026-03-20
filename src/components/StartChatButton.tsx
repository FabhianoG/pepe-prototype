import { useNavigate } from "react-router-dom";

export default function StartChatButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/chat-pepe")}
      className="
        w-full mt-6
        bg-linear-to-r
        from-[#c7e6f5] 
        via-[#a9d4f2] 
        to-[#4a8fd9]
        hover:from-[#4a8fd9]
        hover:to-[#3f7fc4]
        text-gray-900
        rounded-xl
        px-6 py-4
        flex items-center justify-center gap-3
        transition-all duration-300
        shadow-sm hover:shadow-md
      "
    >
      {/* indicador online */}
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>

      <span className="font-semibold text-base md:text-lg">
        Iniciar conversación con PEPE AI
      </span>
    </button>
  );
}
