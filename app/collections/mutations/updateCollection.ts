import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateCollection = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateCollection),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const collection = await db.collection.update({ where: { id }, data })

    return collection
  }
)
