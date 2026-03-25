import type { Empresa } from '../types/empresa'

export const empresas: Empresa[] = [
  {
    id: 1,
    nombre: 'Protecso',
    estado: 'ACTIVO',
  },
  {
    id: 2,
    nombre: 'Tech Solutions',
    estado: 'ACTIVO',
  },
  {
    id: 3,
    nombre: 'Global Corp',
    estado: 'INACTIVO',
  },
]

export const getEmpresas = (): Empresa[] => {
  return empresas.filter((e) => e.estado === 'ACTIVO')
}
