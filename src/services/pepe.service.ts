type ConversationStep =
  | 'init'
  | 'confirming'
  | 'diagnosis'
  | 'awaiting_response'
  | 'derivation'

type ConversationState = {
  step: ConversationStep
  attempts: number
  reference?: string
}

const state: ConversationState = {
  step: 'init',
  attempts: 0,
}

// 🧠 SIMULACIÓN DE MONITOREO
const monitoredDevice = {
  name: 'LaserJet Pro M404',
  issue: 'no imprime', // 'atasco' | 'no imprime' | 'error'
}

// 🔄 RESET
export const resetPepeState = () => {
  state.step = 'init'
  state.attempts = 0
  state.reference = undefined
}

// 🔎 GENERAR CÓDIGO
const generateReference = (): string => {
  return 'MT-' + Math.floor(100000 + Math.random() * 900000)
}

// 🔍 HELPERS MEJORADOS
const isNegative = (msg: string) =>
  msg.includes('no funciona') ||
  msg.includes('sigue igual') ||
  msg.includes('no se solucionó') ||
  msg.includes('continúa igual')

const isPositive = (msg: string) =>
  msg.includes('sí') ||
  msg.includes('si') ||
  msg.includes('ya funciona') ||
  msg.includes('listo') ||
  msg.includes('solucionado')

// 🧠 DETECCIÓN DE PROBLEMA
const detectIssue = (msg: string) => {
  if (msg.includes('no imprime')) return 'no imprime'
  if (msg.includes('atasco') || msg.includes('papel')) return 'atasco'
  if (msg.includes('error') || msg.includes('falla')) return 'error'
  return null
}

// 🧠 FUNCIÓN PRINCIPAL
export const getPepeResponse = (message: string): string => {
  const msg = message.toLowerCase()
  const detectedIssue = detectIssue(msg)

  // 🟢 INIT
  if (state.step === 'init') {
    state.step = 'diagnosis'

    // 🔥 Usuario inicia con problema
    if (detectedIssue) {
      state.step = 'confirming'

      if (detectedIssue === 'no imprime') {
        return `🧠 Entiendo lo que ocurre  

Detecté que tu impresora ${monitoredDevice.name} presenta problemas de impresión  

📡 Según el monitoreo, el equipo no está respondiendo correctamente  

👉 Antes de continuar, confirmemos:  
¿No imprime ningún documento o imprime con errores?`
      }

      if (detectedIssue === 'atasco') {
        return `📄 Detecté un posible atasco en tu impresora ${monitoredDevice.name}  

📡 El sistema indica una obstrucción en el flujo de papel  

👉 ¿La impresora muestra papel atascado o un error en pantalla?`
      }

      return `⚠️ Detecté un comportamiento inusual en tu impresora ${monitoredDevice.name}  

👉 ¿Podrías indicarme qué mensaje aparece o qué comportamiento observas?`
    }

    // saludo normal
    return `👋 Hola, soy Pepe 🤖  

Soporte de equipos de Misión Tecnológica  

🧠 Ya tengo acceso a tus equipos asignados  

🖨️ Detecté actividad irregular en tu impresora ${monitoredDevice.name}  

👉 ¿Qué problema estás experimentando?`
  }

  // 🟡 CONFIRMING (🔥 CLAVE)
  if (state.step === 'confirming') {
    if (msg.includes('no imprime')) {
      state.step = 'awaiting_response'

      return `🖨️ Perfecto, gracias por confirmar  

Vamos a validar el estado de tu impresora ${monitoredDevice.name}:

1. Verifica que esté encendida  
2. Revisa si aparece como "offline"  
3. Confirma papel y tóner  
4. Intenta imprimir una página de prueba  

👉 Dime cómo te va`
    }

    if (msg.includes('error') || msg.includes('falla')) {
      state.step = 'awaiting_response'

      return `⚠️ Entiendo  

Vamos a revisar el error en ${monitoredDevice.name}:

1. Reinicia la impresora  
2. Verifica conexiones  
3. Observa si aparece algún código  

👉 Cuéntame qué ocurre`
    }

    return `🤔 Solo para confirmar  

¿El problema es que no imprime, hay un atasco o aparece algún error?`
  }

  // 🔵 DIAGNÓSTICO
  if (state.step === 'diagnosis') {
    state.attempts++

    if (detectedIssue === 'no imprime' || monitoredDevice.issue === 'no imprime') {
      state.step = 'awaiting_response'

      return `🖨️ Vamos a revisar tu impresora ${monitoredDevice.name}  

1. Verifica encendido  
2. Revisa conexión  
3. Confirma papel y tóner  

👉 Dime si se solucionó`
    }

    if (detectedIssue === 'atasco' || monitoredDevice.issue === 'atasco') {
      state.step = 'awaiting_response'

      return `📄 Vamos a resolver el atasco en ${monitoredDevice.name}  

1. Apaga la impresora  
2. Retira el papel  
3. Enciende nuevamente  

👉 Dime si se solucionó`
    }

    if (state.attempts === 1) {
      return `🤔 ¿El problema es impresión, atasco o error?`
    }

    if (state.attempts >= 2) {
      state.step = 'derivation'
      state.reference = generateReference()

      return `🧠 Gracias por la información  

Voy a derivar tu caso a un especialista 🔧  

📌 He registrado tu solicitud  

🔎 Código: ${state.reference}  

👨‍🔧 Un técnico te contactará  

👉 Continúa la conversación`
    }
  }

  // 🟣 RESPUESTA A SOLUCIÓN
  if (state.step === 'awaiting_response') {
    if (isNegative(msg)) {
      state.step = 'derivation'
      state.reference = generateReference()

      return `🧠 Gracias por intentarlo  

El equipo ${monitoredDevice.name} requiere revisión especializada  

👉 Voy a escalar tu caso 🔧  

📌 Solicitud registrada  

🔎 Código: ${state.reference}  

👨‍🔧 Te contactarán pronto  

👉 Continúa la conversación`
    }

    if (isPositive(msg)) {
      state.step = 'init'
      state.attempts = 0
      state.reference = undefined

      return `🎉 Excelente  

La impresora ${monitoredDevice.name} ya está funcionando  

Si necesitas ayuda, aquí estaré 🤖`
    }

    return `🤔 ¿Se solucionó el problema o continúa?`
  }

  // 🔴 DERIVACIÓN
  if (state.step === 'derivation') {
    return `👨‍🔧 Tu caso está siendo atendido  

🔎 Código: ${state.reference}  

📞 Pronto recibirás soporte  

👉 Continúa la conversación`
  }

  return `⚠️ Ocurrió un error`
}
