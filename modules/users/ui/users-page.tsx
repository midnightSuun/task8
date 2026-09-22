import Link from "next/link"
import { LogoutButton } from "@/modules/auth/ui/logout-button"
import { getUsers } from "../api/get-users"

type Props = {
  limit: number
  page: number
}

export async function UsersPage({ limit, page }: Props) {
  const { users, totalPages } = await getUsers(limit, page)

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.email}</Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2">
        {page > 1 && (
          <Link href={`/users?page=${page - 1}&limit=${limit}`}>Previous</Link>
        )}
        <span>{page}</span>
        {page < totalPages && (
          <Link href={`/users?page=${page + 1}&limit=${limit}`}>Next</Link>
        )}
        <span>{totalPages}</span>
      </div>

      <LogoutButton />
    </>
  )
}
