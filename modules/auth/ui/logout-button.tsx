"use client"

import { logout } from "../api/logout"

export const LogoutButton = () => {
  return <button onClick={logout}>Logout</button>
}
