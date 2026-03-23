// services/dashboard.service.ts

import {
  Ticket,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react'

import type { Stat, TicketItem, ActivityItem } from '../types/dashboard'

// 🔹 STATS
export const getStats = (): Stat[] => [
  {
    title: 'Tickets generados',
    value: 152,
    icon: Ticket,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    title: 'Resueltos',
    value: 120,
    icon: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-500/10'
  },
  {
    title: 'Pendientes',
    value: 22,
    icon: Clock,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10'
  },
  {
    title: 'Críticos',
    value: 10,
    icon: AlertTriangle,
    color: 'text-red-500',
    bg: 'bg-red-500/10'
  }
]

// 🔹 TICKETS
export const getTickets = (): TicketItem[] => [
  {
    id: '#123',
    problem: 'Atasco de papel',
    printer: 'HP LaserJet',
    status: 'resuelto'
  },
  {
    id: '#124',
    problem: 'No imprime',
    printer: 'Epson L3150',
    status: 'pendiente'
  },
  {
    id: '#125',
    problem: 'Error de conexión',
    printer: 'Canon G3110',
    status: 'critico'
  }
]

// 🔹 ACTIVIDAD PEPE
export const getActivity = (): ActivityItem[] => [
  {
    message: 'Pepe resolvió problema de impresión',
    type: 'success'
  },
  {
    message: 'Impresora offline detectada',
    type: 'warning'
  },
  {
    message: 'Error crítico en cola de impresión',
    type: 'error'
  }
]
