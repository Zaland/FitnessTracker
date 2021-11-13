import { resolver, Ctx } from "blitz"
import db from "db"

export default resolver.pipe(resolver.authorize(), async (data: number[], { session }: Ctx) => {
  if (session.userId) {
    console.log(data)
    const deletePromises = data.map((row) => {
      return db.weight.delete({
        where: { id: row },
        select: { id: true },
      })
    })

    return Promise.all(deletePromises)
  }
})
