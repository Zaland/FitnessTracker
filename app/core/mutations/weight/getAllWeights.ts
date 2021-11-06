import { resolver, Ctx } from "blitz"
import db from "db"

export default resolver.pipe(resolver.authorize(), async (_data, { session }: Ctx) => {
  if (session.userId) {
    const weights = await db.weight.findMany({
      where: { userId: session.userId },
      select: { id: true, amount: true, isTypePounds: true, logDate: true },
      orderBy: { logDate: "desc" },
    })

    return weights
  }
})
