import type { LucideIcon } from 'lucide-react'

export interface Stat {
  title: string
  value: number | string
  icon: LucideIcon
  color: string
  bg: string
}

export interface TicketItem {
  id: string
  problem: string
  printer: string
  status: 'resuelto' | 'pendiente' | 'en_proceso' | 'en_pausa'
  priority: 'baja' | 'media' | 'alta'
  date: string
  client: string
}

export interface ActivityItem {
  message: string
  type: 'success' | 'warning' | 'error' | 'info'
}
