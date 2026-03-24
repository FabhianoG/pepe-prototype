import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"
import type { User } from "../types/user"

type ProtectedRouteProps = {
  children: ReactNode
  role?: "ADMIN" | "USER"
}

export default function ProtectedRoute({
  children,
  role,
}: ProtectedRouteProps) {

  const storedUser = localStorage.getItem("user")
  const user: User | null = storedUser ? JSON.parse(storedUser) : null

  // ❌ No hay usuario
  if (!user) {
    return <Navigate to="/" />
  }

  // ❌ No tiene el rol requerido
  if (role && user.role !== role) {
    return <Navigate to="/" />
  }

  // ✅ Todo OK
  return <>{children}</>
}
