import { resolver, Ctx } from "blitz"
import db from "db"
import { ProfileFormUpdate } from "../validations"
import { EmailTakenError } from "./errors"

export default resolver.pipe(
  resolver.zod(ProfileFormUpdate),
  resolver.authorize(),
  async (data, { session }: Ctx) => {
    if (!session.userId || !data) return null

    if (data?.email) {
      const emailCheck = await db.user.findFirst({
        where: { email: data.email },
        select: { email: true },
      })

      if (data.email === emailCheck?.email) throw new EmailTakenError()
    }

    const user = await db.user.update({
      where: { id: session.userId },
      data,
    })

    return user
  }
)
