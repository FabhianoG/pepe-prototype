import type { DashboardData } from '../types/dashboard'

// Simulación de datos (puedes luego traerlos de una API)
const dashboardMock: DashboardData = {
  conversaciones: 12,
  archivos: 5,
  imagenes: 8,
}

export const getDashboardData = (): Promise<DashboardData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dashboardMock)
    }, 500) // simula delay de API
  })
}
