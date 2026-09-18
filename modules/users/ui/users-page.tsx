import { LogoutButton } from "@/modules/auth/ui/logout-button"
import Link from "next/link"
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