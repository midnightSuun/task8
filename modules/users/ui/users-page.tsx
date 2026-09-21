import Link from "next/link"

import { LogoutButton } from "@/modules/auth/ui/logout-button"

import { getUsers } from "../api/get-users"

export async function UsersPage() {
  const users = await getUsers()

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.email}</Link>
          </li>
        ))}
      </ul>
      <LogoutButton />
    </>
  )
}
