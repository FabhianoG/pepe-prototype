export default function PepeInfoCard() {
  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* 🧠 Título */}
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-[#0f172a]">
          ¿Cómo aprovechar mejor a Pepe?
        </h3>
      </div>

      {/* 🔥 INFOGRAFÍA */}
      <div className="mt-4 relative">
        
        {/* Línea vertical */}
        <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-[#5aa9e6]/40"></div>

        <div className="space-y-5">
          
          {/* 🔹 PASO 1 */}
          <div className="flex items-start gap-3 relative">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#5aa9e6] text-white font-bold text-sm shadow-md">
              1
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#0f172a]">
                Describe el problema
              </h4>

              <ul className="mt-1 space-y-0.5">
                <li className="text-sm text-[#1f3c50]">
                  • Indica qué ocurre (no imprime, error, papel atascado, etc.)
                </li>
                <li className="text-sm text-[#1f3c50]">
                  • Menciona cuándo comenzó el problema
                </li>
                <li className="text-xs text-[#64748b]">
                  Ejemplo: "Mi impresora no imprime desde ayer"
                </li>
              </ul>
            </div>
          </div>

          {/* 🔹 PASO 2 */}
          <div className="flex items-start gap-3 relative">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#4e24b1] text-white font-bold text-sm shadow-md">
              2
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#0f172a]">
                Proporciona detalles clave
              </h4>

              <ul className="mt-1 space-y-0.5">
                <li className="text-sm text-[#1f3c50]">
                  • Pepe ya identifica tu impresora automáticamente
                </li>
                <li className="text-sm text-[#1f3c50]">
                  • Indica luces o códigos de error
                </li>
                <li className="text-sm text-[#1f3c50]">
                  • Tipo de conexión (USB, WiFi)
                </li>
                <li className="text-xs text-[#64748b]">
                  Ejemplo: "Tiene luz roja parpadeando y está por WiFi"
                </li>
              </ul>
            </div>
          </div>

          {/* 🔹 PASO 3 */}
          <div className="flex items-start gap-3 relative">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#5aa9e6] text-white font-bold text-sm shadow-md">
              3
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#0f172a]">
                Sigue las instrucciones
              </h4>

              <ul className="mt-1 space-y-0.5">
                <li className="text-sm text-[#1f3c50]">
                  • Aplica los pasos que te indica Pepe
                </li>
                <li className="text-sm text-[#1f3c50]">
                  • Responde para continuar el diagnóstico
                </li>
                <li className="text-sm text-[#1f3c50]">
                  • Pepe puede continuar el diagnóstico o escalar el caso
                </li>
              </ul>
            </div>
          </div>

          {/* 🔹 PASO 4 */}
          <div className="flex items-start gap-3 relative">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#4e24b1] text-white font-bold text-sm shadow-md">
              4
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#0f172a]">
                Confirmación o ayuda especializada
              </h4>

              <ul className="mt-1 space-y-0.5">
                <li className="text-sm text-[#1f3c50]">
                  • Verifica si la impresora funciona correctamente
                </li>
                <li className="text-sm text-[#1f3c50]">
                  • Si el problema continúa, sigue conversando con Pepe
                </li>
                <li className="text-sm text-[#1f3c50]">
                  • Se generará automáticamente un ticket de soporte
                </li>
                <li className="text-sm text-[#1f3c50]">
                  • Tu caso será derivado a un técnico humano
                </li>
                <li className="text-xs text-[#64748b]">
                  Ejemplo: "No funcionó, necesito ayuda" → se genera ticket y un técnico continúa contigo
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* ⚖️ Nota */}
      <p className="text-[11px] text-center text-[#94a3b8] mt-3">
        Este servicio forma parte del soporte de impresoras brindado por Misión Tecnológica.
      </p>

    </div>
  )
}
