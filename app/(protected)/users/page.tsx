import { UsersPage } from "@/modules/users"
import { z } from "zod"

const searchParamsSchema = z.object({
  limit: z.coerce.number().min(1).optional().catch(10).default(10),
  page: z.coerce.number().min(1).optional().catch(1).default(1),
  search: z.string().optional().catch("").default(""),
})

export default async function Users({ searchParams }: PageProps<"/users">) {
  const params = await searchParams
  const { limit, page, search } = searchParamsSchema.parse(params)

  return <UsersPage limit={limit} page={page} search={search} />
}