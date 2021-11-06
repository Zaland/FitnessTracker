import { resolver, Ctx } from "blitz"
import db from "db"
import { WeightForm } from "app/core/validations"

export default resolver.pipe(
  resolver.zod(WeightForm),
  resolver.authorize(),
  async (data, { session }: Ctx) => {
    if (session.userId) {
      const weight = await db.weight.create({
        data: { ...data, userId: session.userId },
        select: { id: true, amount: true, isTypePounds: true, logDate: true },
      })
      return weight
    }
  }
)
