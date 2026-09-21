import Link from "next/link"
import { LogoutButton } from "@/modules/auth/ui/logout-button"
import { getUsers } from "../api/get-users"

type Props = {
  limit: number
  page: number
}

export async function UsersPage({ limit, page } : Props) {
  const users = await getUsers(limit, page)

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
