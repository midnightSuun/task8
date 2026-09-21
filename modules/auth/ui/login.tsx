"use client"

import { login } from "../api/login"
import { logout } from "../api/logout"

export function Login() {
  const onLogin = async () => {
    await login({ email: "yanina.sviridova24+2@gmail.com", password: "secret" })
  }

  const onLogout = async () => {
    await logout()
  }

  return (
    <div>
      <button onClick={onLogin}>Login</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  )
}
