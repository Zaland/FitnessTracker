import { resolver, Ctx } from "blitz"
import db from "db"
import { ProfileForm } from "../validations"

export default resolver.pipe(
  resolver.zod(ProfileForm),
  resolver.authorize(),
  async (data, { session }: Ctx) => {
    if (!session.userId || !data) return null

    const user = await db.user.update({
      where: { id: session.userId },
      data,
    })

    return user
  }
)
