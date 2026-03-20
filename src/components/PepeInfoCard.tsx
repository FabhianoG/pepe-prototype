export default function PepeInfoCard() {
  return (
    <div className="w-full max-w-2xl">
      
      {/* 🧠 Título */}
      <h3 className="text-2xl font-semibold text-[#0f172a]">
        ¿Cómo aprovechar mejor a Pepe?
      </h3>

      {/* 📝 Descripción */}
      <p className="text-[#1f3c50] mt-2 text-sm leading-relaxed">
        Sigue estos pasos para obtener soluciones rápidas y precisas.
      </p>

      {/* 🔥 INFOGRAFÍA */}
      <div className="mt-8 relative">
        
        {/* Línea vertical */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#5aa9e6]/40"></div>

        <div className="space-y-8">
          
          {/* 🔹 PASO 1 */}
          <div className="flex items-start gap-4 relative">
            
            {/* Número */}
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#5aa9e6] text-white font-bold text-sm shadow-md">
              1
            </div>

            {/* Contenido */}
            <div>
              <h4 className="text-sm font-semibold text-[#0f172a]">
                Describe el problema
              </h4>

              <ul className="mt-2 space-y-1">
                <li className="text-sm text-[#1f3c50]">
                  • Explica qué ocurre (no imprime, error, etc.)
                </li>
                <li className="text-sm text-[#1f3c50]">
                  • Indica cuándo comenzó el problema
                </li>
              </ul>
            </div>
          </div>

          {/* 🔹 PASO 2 */}
          <div className="flex items-start gap-4 relative">
            
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#4e24b1] text-white font-bold text-sm shadow-md">
              2
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#0f172a]">
                Proporciona detalles clave
              </h4>

              <ul className="mt-2 space-y-1">
                <li className="text-sm text-[#1f3c50]">
                  • Modelo de tu impresora
                </li>
                <li className="text-sm text-[#1f3c50]">
                  • Luces o códigos de error
                </li>
                <li className="text-sm text-[#1f3c50]">
                  • Tipo de conexión (USB, WiFi)
                </li>
              </ul>
            </div>
          </div>

          {/* 🔹 PASO 3 */}
          <div className="flex items-start gap-4 relative">
            
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#5aa9e6] text-white font-bold text-sm shadow-md">
              3
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#0f172a]">
                Sigue las instrucciones
              </h4>

              <ul className="mt-2 space-y-1">
                <li className="text-sm text-[#1f3c50]">
                  • Aplica los pasos indicados
                </li>
                <li className="text-sm text-[#1f3c50]">
                  • Si no funciona, brinda más información
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
