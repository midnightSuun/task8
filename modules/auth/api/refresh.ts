import { RefreshTokenDocument } from "@/gql/graphql"
import { getGraphQlClient } from "@/lib/graphql"
import { setTokens } from "../helpers/tokens"

export const refresh = async () => {
    const gql = await getGraphQlClient()
    const data = await gql.request(RefreshTokenDocument)

    await setTokens(data.updateToken.access_token, data.updateToken.refresh_token)
}
