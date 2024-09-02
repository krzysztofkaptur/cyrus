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

  return res.json(todoRes[0])
})

router.patch('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, description, completed } = req.body

  const todoRes = await db
    .select()
    .from(todos)
    .where(eq(todos.id, +id))

  const updatedTodo = {
    ...todoRes[0],
    name: name ?? todoRes[0].name,
    description: description ?? todoRes[0].description,
    completed: completed ?? todoRes[0].completed
  }

  return res.json(updatedTodo)
})

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  const todoRes = await db
    .select()
    .from(todos)
    .where(eq(todos.id, +id))

  return res.json(todoRes[0])
})

export default router
