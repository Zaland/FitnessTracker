import { z } from "zod"

export const ProfileForm = z.object({
  name: z.optional(z.string()),
})
