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
  status: 'resuelto' | 'pendiente' | 'critico'
}

export interface ActivityItem {
  message: string
  type: 'success' | 'warning' | 'error' | 'info'
}
