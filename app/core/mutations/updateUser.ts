import { resolver, Ctx } from "blitz"
import db from "db"
import { ProfileForm } from "../validations"
import { EmailTakenError } from "./errors"

const generateDataToUpdate = async (db, data, session) => {
  const currentUser = await db.user.findFirst({
    where: { id: session.userId },
    select: { email: true },
  })

  if (currentUser?.email === data.email) {
    return { name: data.name }
  } else {
    const emailCheck = await db.user.findFirst({
      where: { email: data.email },
      select: { email: true },
    })

    if (data.email === emailCheck?.email) throw new EmailTakenError()
    else {
      return { email: data.email, name: data.name }
    }
  }
}

export default resolver.pipe(
  resolver.zod(ProfileForm),
  resolver.authorize(),
  async (data, { session }: Ctx) => {
    if (!session.userId || !data) return null

    const dataToUpdate = await generateDataToUpdate(db, data, session)

    const user = await db.user.update({
      where: { id: session.userId },
      data: dataToUpdate,
    })

    return user
  }
)
