import { RefreshTokenDocument } from "@/gql/graphql"
import { getGraphQlClient } from "@/lib/graphql"

export const refreshTokens = async (refreshToken: string) => {
  const gql = getGraphQlClient(refreshToken)
  const data = await gql.request(RefreshTokenDocument)

  return {
    accessToken: data.updateToken.access_token,
    refreshToken: data.updateToken.refresh_token,
  }
}
