import { UserPage } from "@/modules/users/ui/user-page"

type Props = {
  params: Promise<{ userId: string }>
}

export default async function User({ params }: Props) {
  const { userId } = await params

  return (
    <>
      <UserPage userId={userId} />
    </>
  )
}
