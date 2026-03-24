import {
  Ticket,
  CheckCircle,
  Clock,
} from 'lucide-react'

import type { Stat, TicketItem } from '../types/dashboard'

// STATS
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
    title: 'En proceso',
    value: 15,
    icon: Clock,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  }
]

// TICKETS
export const getTickets = (): TicketItem[] => [
  {
    id: '#123',
    problem: 'Atasco de papel',
    printer: 'HP LaserJet',
    status: 'resuelto',
    priority: 'media',
    date: '2026-03-20',
    client: 'Empresa ABC'
  },
  {
    id: '#124',
    problem: 'No imprime',
    printer: 'Epson L3150',
    status: 'pendiente',
    priority: 'alta',
    date: '2026-03-21',
    client: 'Tech Solutions'
  },
  {
    id: '#125',
    problem: 'Error de conexión',
    printer: 'Canon G3110',
    status: 'en_proceso',
    priority: 'alta',
    date: '2026-03-22',
    client: 'Logística Perú'
  },
  {
    id: '#126',
    problem: 'Impresión borrosa',
    printer: 'Brother DCP',
    status: 'en_pausa',
    priority: 'media',
    date: '2026-03-22',
    client: 'Oficinas SAC'
  }
]
