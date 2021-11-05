import { z } from "zod"

export const ProfileForm = z.object({
  email: z.string().email(),
  name: z.optional(z.string()),
})

export const ProfileFormUpdate = z.object({
  email: z.optional(z.string().email()),
  name: z.optional(z.string()),
})

export const WeightForm = z.object({
  amount: z.number(),
  isTypePounds: z.boolean(),
  logDate: z.date(),
})
