import { GetUsersDocument } from "@/gql/graphql"
import { getGql } from "@/lib/graphql"

export async function getUsers(limit: number, page: number) {
  const gql = await getGql()
  const data = await gql.request(GetUsersDocument, {
    params: { limit, page },
  })

  return {
    users: data.users.items,
    totalPages: data.users.total_pages
  }
}
