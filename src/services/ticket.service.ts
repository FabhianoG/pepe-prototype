type TicketStep =
  | 'idle'
  | 'waiting_serial'
  | 'waiting_problem'
  | 'waiting_severity'
  | 'waiting_phone'
  | 'completed'

type TicketState = {
  step: TicketStep
  serial?: string
  problem?: string
  severity?: string
  phone?: string
  ticket?: string
}

// 🔥 ESTADO GLOBAL DEL FLUJO
const state: TicketState = {
  step: 'idle',
}

// 🔥 DETECTAR SI EL FLUJO ESTÁ ACTIVO
export const isTicketActive = () => {
  return state.step !== 'idle'
}

// 🔁 RESET COMPLETO
export const resetTicketState = () => {
  state.step = 'idle'
  state.serial = undefined
  state.problem = undefined
  state.severity = undefined
  state.phone = undefined
  state.ticket = undefined
}

// 🎫 GENERAR CÓDIGO DE TICKET
const generateTicket = (): string => {
  return `HP-${new Date().getFullYear()}-${Math.floor(
    10000 + Math.random() * 90000,
  )}`
}

// 🔍 VALIDACIONES
const detectSerial = (msg: string): string | null => {
  const match = msg.match(/[A-Z0-9]{6,}/i)
  return match ? match[0].toUpperCase() : null
}

const detectPhone = (msg: string): string | null => {
  const match = msg.match(/\b\d{9}\b/)
  return match ? match[0] : null
}

// 🤖 MENSAJES
const responses = {
  askSerial: () => `🎫 Perfecto, vamos a generar un ticket de soporte técnico  

Para comenzar, necesito algunos datos 📋  

👉 Por favor indícame el número de serie de tu impresora`,

  invalidSerial: () => `🔢 No logré identificar el número de serie  

Por favor envíalo nuevamente (ej: CNF123ABC)`,

  askProblem: (serial: string) => `✅ Serie registrada: "${serial}"  

Ahora descríbeme el problema que presenta tu impresora 🛠️`,

  askSeverity: () => `📊 Gracias  

¿Cómo describirías la urgencia del problema?  

Puedes responder con:  
- Baja  
- Media  
- Alta`,

  askPhone: () => `📱 Perfecto  

Ahora necesito un número de celular para que el técnico pueda contactarte`,

  invalidPhone: () => `📱 Por favor ingresa un número válido de 9 dígitos`,

  completed: (data: TicketState) => `🎫 Ticket generado correctamente  

📌 Resumen de tu solicitud:  

🔢 Serie: ${data.serial}  
🛠️ Problema: ${data.problem}  
📊 Urgencia: ${data.severity}  
📱 Contacto: ${data.phone}  

🎫 Número de ticket: ${data.ticket}  

Un técnico se comunicará contigo pronto 👨‍🔧`,
}

// 🧠 DETECTOR
const isTicketIntent = (msg: string) => {
  return (
    msg.includes('ticket') ||
    msg.includes('tecnico') ||
    msg.includes('soporte')
  )
}

// 🚀 FLUJO PRINCIPAL
export const handleTicketFlow = (message: string): string | null => {
  const msg = message.toLowerCase().trim()

  if (state.step === 'idle') {
    if (isTicketIntent(msg)) {
      state.step = 'waiting_serial'
      return responses.askSerial()
    }
    return null
  }

  if (state.step === 'waiting_serial') {
    const serial = detectSerial(message)

    if (!serial) return responses.invalidSerial()

    state.serial = serial
    state.step = 'waiting_problem'

    return responses.askProblem(serial)
  }

  if (state.step === 'waiting_problem') {
    state.problem = message
    state.step = 'waiting_severity'

    return responses.askSeverity()
  }

  if (state.step === 'waiting_severity') {
    state.severity = message
    state.step = 'waiting_phone'

    return responses.askPhone()
  }

  if (state.step === 'waiting_phone') {
    const phone = detectPhone(message)

    if (!phone) return responses.invalidPhone()

    state.phone = phone
    state.ticket = generateTicket()
    state.step = 'completed'

    return responses.completed(state)
  }

  if (state.step === 'completed') {
    resetTicketState()
    return null
  }

  return null
}
