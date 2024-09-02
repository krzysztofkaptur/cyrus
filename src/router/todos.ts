import { Request, Response, Router } from 'express'

import db from '../libs/db/config'
import { todos } from '../libs/db/schema'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const todosRes = await db.select().from(todos)

  return res.json(todosRes)
})

export default router
