import { GetUsersDocument } from "@/gql/graphql"
import { getGql } from "@/lib/graphql"

export async function getUsers() {
  const gql = await getGql()
  const data = await gql.request(GetUsersDocument, {
    params: { limit: 1000, page: 1 },
  })

  return data.users.items
}
