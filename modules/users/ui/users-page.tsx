import { LogoutButton } from "@/modules/auth/ui/logout-button"
import { getUsers } from "../api/get-users"
import { SearchInput } from "@/components/search-input"
import Link from "next/link"
import { Pagination } from "@/components/pagination"
import { Suspense } from "react"

type Props = {
  limit: number
  page: number
  search: string
}

async function UsersPageAsyncBoundary({ limit, page, search }: Props) {
  const { users, totalPages } = await getUsers(limit, page, search)

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.email}</Link>
          </li>
        ))}
      </ul>
      <Pagination
        page={page}
        limit={limit}
        totalPages={totalPages}
        path="/users"
        search={search}
      />
    </>

  )
}

export function UsersPage({ limit, page, search }: Props) {
  
  return (
    <>
      <div className="flex items-center justify-between">
        <SearchInput limit={limit} search={search} />
        <LogoutButton />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Create user</button>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <UsersPageAsyncBoundary limit={limit} page={page} search={search} />
      </Suspense>
    </>
  )
}
