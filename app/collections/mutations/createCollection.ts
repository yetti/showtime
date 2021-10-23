import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateCollection = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateCollection),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const collection = await db.collection.create({ data: input })

    return collection
  }
)
