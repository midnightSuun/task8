import { GraphQLClient } from "graphql-request"
import { cookies } from "next/headers"

import { refresh } from "@/modules/auth"
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/modules/auth/consts"

export const getGraphQlClient = (token?: string) => {
  return new GraphQLClient(process.env.GRAPHQL_URL!, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
}

export const getGql = async () => {
  const cookieStore = await cookies()
  let token = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value

  if (!token) {
    const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value

    if (refreshToken) {
      await refresh()
      token = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value
    }
  }

  return getGraphQlClient(token)
}
