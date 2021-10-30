import { z } from "zod"

export const ProfileForm = z.object({
  email: z.string().email(),
  name: z.optional(z.string()),
})
