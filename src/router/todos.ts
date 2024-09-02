import { Request, Response, Router } from 'express'
import { eq } from 'drizzle-orm'

import db from '../libs/db/config'
import { todos } from '../libs/db/schema'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const todosRes = await db.select().from(todos)

  return res.json(todosRes)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const todoRes = await db
    .select()
    .from(todos)
    .where(eq(todos.id, +id))

  return res.json(todoRes)
})

export default router
