import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetCollection = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetCollection), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const collection = await db.collection.findFirst({ where: { id } })

  if (!collection) throw new NotFoundError()

  return collection
})
