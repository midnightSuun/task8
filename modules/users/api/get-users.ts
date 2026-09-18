import { getGql } from "@/lib/graphql"
import { GetUsersDocument } from "@/gql/graphql"

export async function getUsers() {
  const gql = await getGql()
  const data = await gql.request(GetUsersDocument, { params: { limit: 1000, page: 1 } })
  
  return data.users.items
}