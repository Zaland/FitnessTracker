import SuperJson from "superjson"

export class EmailTakenError extends Error {
  name = "EmailTakenError"
  constructor() {
    super()
    this.message = "Email is already taken."
  }
}
SuperJson.registerClass(EmailTakenError, { identifier: "EmailTakenError" })
