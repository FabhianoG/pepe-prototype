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
  askedForSerial?: boolean
}

const state: ConversationState = {}

const formatSteps = (steps: string[]): string => {
  return (
    'Sigue estos pasos:\n\n' +
    steps.map((step, i) => `${i + 1}. ${step}`).join('\n')
  )
}

const intents: Intent[] = [
  // 🔹 SALUDOS
  {
    phrases: ['hola', 'hola pepe', 'buenas', 'hola como estas', 'ola'],
    keywords: ['hola', 'buenas', 'saludos'],
    responses: [
      'Hola 👋 soy PEPE AI, soporte técnico para impresoras HP. ¿Qué problema tienes?',
      '¡Hola! 🤖 Te ayudaré con tu impresora HP. ¿Qué ocurre?',
    ],
  },

  // 🔹 NO IMPRIME A COLOR 🔥
  {
    phrases: [
      'no imprime a color',
      'no sale color',
      'imprime en blanco y negro',
    ],
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

  // 🔹 NO IMPRIME
  {
    phrases: ['no imprime', 'no imprime nada', 'no sale hoja'],
    keywords: ['imprime'],
    responses: [
      formatSteps([
        'Verifica que la impresora esté encendida',
        'Revisa que tenga papel en la bandeja',
        'Confirma la conexión (USB o WiFi)',
        'Verifica que esté en línea (no offline)',
        'Reinicia la impresora y tu computadora',
      ]),
    ],
    priority: 2,
  },

  // 🔹 TINTA
  {
    phrases: ['sin tinta', 'no hay tinta', 'sale borroso'],
    keywords: ['tinta', 'cartucho'],
    responses: [
      formatSteps([
        'Revisa el nivel de tinta',
        'Reemplaza cartuchos si están vacíos',
        'Limpia los cabezales desde HP Smart',
        'Alinea los cartuchos',
      ]),
    ],
  },

  // 🔹 WIFI
  {
    phrases: ['no conecta wifi', 'problema red'],
    keywords: ['wifi', 'conexion'],
    responses: [
      formatSteps([
        'Verifica que esté en la misma red',
        'Reinicia el router',
        'Reconecta la impresora',
        'Restablece red desde el panel HP',
      ]),
    ],
  },

  // 🔹 ERROR
  {
    phrases: ['error', 'codigo error'],
    keywords: ['error', 'codigo'],
    responses: [
      'Necesito el código de error exacto que aparece en tu impresora HP.',
    ],
    priority: 3,
  },
]

const tokenize = (text: string): string[] => text.split(' ')
const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

// 🔥 DETECCIÓN INTELIGENTE DE SERIAL
const detectSerial = (msg: string): string | null => {
  // 🔹 Caso 1: "numero de serie es CNF1234ABC"
  const matchPhrase = msg.match(
    /(numero de serie|serial|serie)\s*(?:es\s*)?([a-z0-9]+)/i,
  )
  if (matchPhrase) {
    return matchPhrase[2]
  }

  // 🔹 Caso 2: alfanumérico (ABC123, 123XYZ)
  const matchAlfanum = msg.match(/\b[a-z]*\d+[a-z\d]*\b/i)
  if (matchAlfanum) {
    return matchAlfanum[0]
  }

  // 🔹 Caso 3: solo números (mínimo 3 dígitos)
  const matchNumbers = msg.match(/\b\d{3,}\b/)
  if (matchNumbers && msg.length <= 15) {
    return matchNumbers[0]
  }

  return null
}

export const getPepeResponse = (message: string): string => {
  const msg = normalizeText(message)
  const tokens = tokenize(msg)

  // 🔹 Detectar serial automáticamente
  const detectedSerial = detectSerial(msg)
  if (detectedSerial) {
    state.serial = detectedSerial
    state.askedForSerial = false

    return `Perfecto 👍 número de serie registrado: "${state.serial}".\n\nAhora continuaré ayudándote.`
  }

  // 🔹 Si estamos esperando el serial
  if (state.askedForSerial && !state.serial) {
    state.serial = message
    state.askedForSerial = false

    return `Gracias 👍 número de serie "${state.serial}" guardado.\n\nContinuemos con la solución.`
  }

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

    // 🔥 PERSONALIZACIÓN CON SERIAL
    if (state.serial) {
      response += `\n\n📌 Impresora HP detectada\n🔢 Serie: ${state.serial}`
      response += '\n🧾 Se generará un ticket para su atención.'
    } else {
      state.askedForSerial = true
      response +=
        '\n\nSi el problema continúa, indícame el número de serie de tu impresora HP.'
    }

    return `\n\n${response}\n`
  }

  if (msg.length < 4) {
    return '¿Puedes darme más detalles del problema?'
  }

  return 'No entendí bien 🤔. ¿Tu impresora HP no imprime, no imprime a color o muestra algún error?'
}
