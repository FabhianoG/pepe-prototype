import { normalizeText } from '../utils/textNormalizer'
import { isSimilar } from '../utils/fuzzyMatch'

type Intent = {
  phrases: string[]
  keywords: string[]
  responses: string[]
  priority?: number
}

type ConversationState = {
  serial?: string
  step: 'init' | 'waiting_serial' | 'diagnosis'
}

// 🔥 ESTADO GLOBAL
const state: ConversationState = {
  step: 'init',
}

// 🔥 RESET DEL BOT (IMPORTANTE)
export const resetPepeState = () => {
  state.serial = undefined
  state.step = 'init'
}

// 🔹 FORMATEAR PASOS
const formatSteps = (steps: string[]): string => {
  return (
    'Sigue estos pasos:\n\n' +
    steps.map((step, i) => `${i + 1}. ${step}`).join('\n')
  )
}

// 🔹 INTENTS
const intents: Intent[] = [
  {
    phrases: ['hola', 'buenas', 'ola'],
    keywords: ['hola'],
    responses: [
      '¡Hola! 🤖 Te ayudaré con tu impresora HP.',
    ],
  },

  {
    phrases: ['no imprime a color', 'no sale color', 'blanco y negro'],
    keywords: ['color', 'blanco', 'negro'],
    responses: [
      formatSteps([
        'Verifica que los cartuchos de color tengan tinta',
        'Asegúrate de que NO esté activada la opción "escala de grises"',
        'Ve a propiedades de impresión y selecciona "color"',
        'Realiza limpieza de cabezales desde HP Smart',
        'Imprime una página de prueba en color',
      ]),
    ],
    priority: 5,
  },

  {
    phrases: ['no imprime', 'no imprime nada'],
    keywords: ['imprime'],
    responses: [
      formatSteps([
        'Verifica que la impresora esté encendida',
        'Revisa que tenga papel',
        'Confirma conexión (USB o WiFi)',
        'Verifica que esté en línea',
        'Reinicia la impresora y PC',
      ]),
    ],
    priority: 2,
  },

  {
    phrases: ['sin tinta', 'borroso'],
    keywords: ['tinta', 'cartucho'],
    responses: [
      formatSteps([
        'Revisa nivel de tinta',
        'Reemplaza cartuchos',
        'Limpia cabezales',
        'Alinea cartuchos',
      ]),
    ],
  },

  {
    phrases: ['wifi', 'no conecta'],
    keywords: ['wifi', 'conexion'],
    responses: [
      formatSteps([
        'Verifica misma red',
        'Reinicia router',
        'Reconecta impresora',
        'Restablece red',
      ]),
    ],
  },

  {
    phrases: ['error'],
    keywords: ['error'],
    responses: [
      'Indícame el código de error exacto que aparece en tu impresora.',
    ],
  },
]

// 🔹 UTILS
const tokenize = (text: string): string[] => text.split(' ')
const getRandom = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)]

// 🔥 DETECCIÓN DE SERIAL
const detectSerial = (msg: string): string | null => {
  const matchPhrase = msg.match(
    /(numero de serie|serial|serie)\s*(?:es\s*)?([a-z0-9]+)/i,
  )
  if (matchPhrase) return matchPhrase[2]

  const matchAlfanum = msg.match(/\b[a-z]*\d+[a-z\d]*\b/i)
  if (matchAlfanum) return matchAlfanum[0]

  const matchNumbers = msg.match(/\b\d{3,}\b/)
  if (matchNumbers && msg.length <= 15) return matchNumbers[0]

  return null
}

// 🔥 FUNCIÓN PRINCIPAL (CON GUION)
export const getPepeResponse = (message: string): string => {
  const msg = normalizeText(message)

  // 🟢 STEP 1: INICIO
  if (state.step === 'init') {
    state.step = 'waiting_serial'

    return '¡Hola! 🤖 Te ayudaré con tu impresora HP.\n\nPara comenzar, indícame el número de serie.'
  }

  // 🟡 STEP 2: ESPERANDO SERIAL
  if (state.step === 'waiting_serial') {
    const detectedSerial = detectSerial(msg)

    if (!detectedSerial) {
      return 'Por favor, indícame un número de serie válido (ej: CNF123ABC)'
    }

    state.serial = detectedSerial
    state.step = 'diagnosis'

    return `Perfecto 👍 número de serie registrado: "${state.serial}".\n\nAhora dime cuál es el problema con tu impresora.`
  }

  // 🔵 STEP 3: DIAGNÓSTICO
  if (state.step === 'diagnosis') {
    const tokens = tokenize(msg)

    let bestIntent: Intent | null = null
    let bestScore = 0

    for (const intent of intents) {
      let score = 0

      for (const phrase of intent.phrases) {
        if (msg.includes(phrase)) score += 4
      }

      for (const keyword of intent.keywords) {
        if (msg.includes(keyword)) score += 2
      }

      for (const token of tokens) {
        for (const keyword of intent.keywords) {
          if (isSimilar(token, keyword)) score += 1
        }
      }

      if (intent.priority) score += intent.priority

      if (score > bestScore) {
        bestScore = score
        bestIntent = intent
      }
    }

    if (bestIntent && bestScore > 0) {
      let response = getRandom(bestIntent.responses)

      response += `\n\n📌 Impresora HP detectada`
      response += `\n🔢 Serie: ${state.serial}`
      response += `\n🧾 Se generará un ticket para su atención.`

      return response
    }

    return 'No entendí bien 🤔. ¿Tu impresora no imprime, no imprime a color o muestra error?'
  }

  return 'Error en el sistema.'
}
