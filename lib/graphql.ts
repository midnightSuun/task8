import { GraphQLClient } from "graphql-request";
import { cookies } from "next/headers";

export const getGql = async () => {
  const token = (await cookies()).get("access_token")?.value;

if (!token) {
  const refreshToken = (await cookies()).get("refresh_token")?.value;
}

  return new GraphQLClient(process.env.GRAPHQL_URL!, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};