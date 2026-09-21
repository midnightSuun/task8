import { UsersPage } from "@/modules/users"

export default async function Users({searchParams}: PageProps<"/users">) {
  const params = await searchParams

  const limit = Number(params.limit) || 10
  const page = Number(params.page) || 1

  return <UsersPage limit={limit} page={page} />
}