import { GetUsersDocument } from "@/gql/graphql"
import { getGql } from "@/lib/graphql"
import { cacheLife } from "next/cache"

export async function getUsers(limit: number, page: number, search: string) {
  'use cache: private'
  cacheLife("seconds")
  
  const gql = await getGql()
  const data = await gql.request(GetUsersDocument, {
    params: { limit, page, search },
  })

  return {
    users: data.users.items,
    totalPages: data.users.total_pages
  }
}
