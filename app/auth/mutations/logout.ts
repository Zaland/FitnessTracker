import { Ctx } from "blitz"

export default async function logout(_data: unknown, ctx: Ctx) {
  return await ctx.session.$revoke()
}
