import { LogoutButton } from "@/modules/auth/ui/logout-button"
import Link from "next/link"
import { getUsers } from "../api/get-users"
import { SearchInput } from "./search-input"

type Props = {
  limit: number
  page: number
  search: string
}

export async function UsersPage({ limit, page, search }: Props) {
  const { users, totalPages } = await getUsers(limit, page, search)

  return (
    <>
      <div className="flex items-center justify-between">
        <SearchInput limit={limit} search={search} />
        <LogoutButton />
      </div>
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
    </>
  )
}
