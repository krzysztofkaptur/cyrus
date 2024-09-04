import { Request, Response, Router } from 'express'
import {
  eq,
  desc,
  InferSelectModel,
  ColumnMap,
  withParam,
  todos,
  db
} from '../libs/db'

import { formatDate } from '../libs/utils'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const { limit, order } = req.query
  const queryBuild = db
    .select()
    .from(todos)
    .limit(+limit! || -1)
    .$dynamic()
  const columnMap: ColumnMap = {
    id: todos.id,
    name: todos.name,
    completed: todos.completed,
    created_at: todos.created_at
  }

  const query = await withParam(queryBuild, order as string, columnMap)

  return res.json(query)
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

type Todo = InferSelectModel<typeof todos>

router.post('/', async (req: Request, res: Response) => {
  const { name, description } = req.body
  const lastTodo = await db
    .select()
    .from(todos)
    .orderBy(desc(todos.id))
    .limit(1)

  const newTodo: Todo = {
    id: lastTodo[0].id,
    name,
    description,
    completed: false,
    created_at: formatDate(new Date()),
    updated_at: formatDate(new Date())
  }

  return res.json(newTodo)
})

export default router
