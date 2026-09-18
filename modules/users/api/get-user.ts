import { GetUserDocument } from "@/gql/graphql"
import { getGql } from "@/lib/graphql"

export async function getUser(userId: string) {
    const gql = await getGql()
    const data = await gql.request(GetUserDocument, { id: userId })

    return data.user
}