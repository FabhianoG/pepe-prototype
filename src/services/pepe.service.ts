type ConversationState = {
  serial?: string
  ticket?: string
  step: 'init' | 'waiting_serial' | 'diagnosis' | 'solution_provided'
}

const state: ConversationState = {
  step: 'init',
}

// 🔥 RESET
export const resetPepeState = () => {
  state.serial = undefined
  state.ticket = undefined
  state.step = 'init'
}

// 🔍 DETECTAR SERIAL
const detectSerial = (msg: string): string | null => {
  const match = msg.match(/[a-zA-Z0-9]{5,}/)
  return match ? match[0] : null
}

// 🎫 GENERAR TICKET
const generateTicket = (): string => {
  return 'HP-' + Math.floor(100000 + Math.random() * 900000)
}

// 🤖 FUNCIÓN PRINCIPAL
export const getPepeResponse = (message: string): string => {
  const msg = message.toLowerCase()

  // 🟢 1. INICIO
  if (state.step === 'init') {
    if (msg.includes('hola')) {
      state.step = 'waiting_serial'

      return `👋 Hola, soy Pepe 🤖  

Tu asistente virtual de soporte para impresoras HP.  
Estoy aquí para ayudarte paso a paso a resolver cualquier problema con tu equipo de forma rápida y sencilla 👍  

Para comenzar, necesito registrar tu impresora en el sistema 🔍  
👉 ¿Podrías brindarme el número de serie?`
    }

    return `👋 Para empezar, puedes escribirme "hola" y con gusto te ayudaré 😊`
  }

  // 🟡 2. ESPERANDO SERIAL
  if (state.step === 'waiting_serial') {
    const serial = detectSerial(message)

    if (!serial) {
      return `🔢 No logré identificar el número de serie  

Por favor, envíamelo nuevamente (ejemplo: CNF123ABC) para poder continuar.`
    }

    state.serial = serial
    state.step = 'diagnosis'

    return `✅ ¡Perfecto! Ya registré tu impresora correctamente  

🔢 Número de serie: "${state.serial}"  

Ahora cuéntame con confianza 👇  
¿Qué problema estás presentando con tu impresora?`
  }

  // 🔵 3. DIAGNÓSTICO
  if (state.step === 'diagnosis') {
    if (msg.includes('color')) {
      state.step = 'solution_provided'

      return `🎨 Gracias por indicarme el problema  

Entiendo que tu impresora no está imprimiendo a color.  
Este inconveniente suele ocurrir por algunas razones comunes como:  

- Cartuchos de color sin tinta  
- Configuración en blanco y negro activada  
- Cabezales de impresión obstruidos  

Vamos a solucionarlo paso a paso 👇  

1. Verifica que los cartuchos de color tengan suficiente tinta  
2. Asegúrate de que NO esté activada la opción "escala de grises"  
3. En propiedades de impresión, selecciona "color"  
4. Realiza una limpieza de cabezales desde el software HP  
5. Imprime una página de prueba en color  

Tómate un momento para realizar estos pasos 👀  
Cuando termines, dime si el problema se solucionó 👍`
    }

    return `🤔 No logré identificar el problema con claridad  

¿Tu impresora no imprime a color? Puedes indicármelo para ayudarte mejor.`
  }

  // 🟣 4. DESPUÉS DE SOLUCIÓN
  if (state.step === 'solution_provided') {
    if (msg.includes('no') || msg.includes('sigue')) {
      // 🎫 generar ticket aquí
      state.ticket = generateTicket()

      state.step = 'init'

      return `📌 Gracias por intentarlo  

Dado que el problema persiste, procederé a registrar tu caso para una atención más especializada 🔧  

🔢 Serie: "${state.serial}"  
🛠️ Problema: Impresión sin color  

🎫 Ticket generado: "${state.ticket}"  

Un especialista se comunicará contigo en breve para brindarte una solución más avanzada  

Si necesitas ayuda con algo más, estaré aquí para apoyarte 😊`
    }

    return `🎉 ¡Excelente! Me alegra saber que tu impresora ya funciona correctamente  

Si necesitas ayuda en el futuro, no dudes en volver a escribirme 🤖`
  }

  return `⚠️ Ocurrió un error en el sistema`
}
