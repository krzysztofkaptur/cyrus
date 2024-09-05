import { Request, Response, Router } from 'express'
import { eq, desc, ColumnMap, withParam, todos, db, count } from '../../libs/db'

import { formatDate } from '../../libs/utils'
import {
  DeleteBody,
  DeleteRequestParams,
  FetchAllBody,
  FetchAllRequestQuery,
  FetchSingleBody,
  FetchSingleRequestParams,
  PatchRequestBody,
  PatchRequestParams,
  PostRequestBody,
  Todo
} from './types'

import {
  fetchTodosBodySchema,
  fetchTodoBodySchema,
  patchTodoBodySchema,
  deleteTodoBodySchema,
  postTodoBodySchema
} from '../../libs/validation/schema/todos'
import { ZodObject, ZodRawShape } from 'zod'

const router = Router()

function handleValidation<T extends ZodRawShape>(
  schema: ZodObject<T>,
  body: unknown
) {
  const validation = schema.safeParse(body)

  return validation
}

router.get(
  '/',
  async (req: Request<{}, {}, {}, FetchAllRequestQuery>, res: Response) => {
    const { limit, order, page = '1', per_page = '10' } = req.query

    const body: FetchAllBody = {
      limit: +limit || undefined,
      order,
      page: +page,
      per_page: +per_page
    }

    const { success, error } = handleValidation(fetchTodosBodySchema, body)

    if (!success) {
      return res.json(error.format())
    }

    const offset = (body.page - 1) * body.per_page

    // todo: move it to one query
    const countResult = await db.select({ count: count() }).from(todos)

    const queryBuild = db
      .select()
      .from(todos)
      .limit(body.limit || body.per_page || -1)
      .offset(offset)
      .$dynamic()

    const columnMap: ColumnMap = {
      id: todos.id,
      name: todos.name,
      completed: todos.completed,
      created_at: todos.created_at
    }

    const total = countResult[0].count
    const totalPages = Math.ceil(total / body.per_page)

    const results = await withParam(queryBuild, order as string, columnMap)

    const prev = body.page === 1 ? null : `/api/v1/todos?page=${body.page - 1}`
    const next =
      body.page + 1 > totalPages ? null : `/api/v1/todos?page=${body.page + 1}`

    return res.json({
      prev,
      next,
      total,
      results
    })
  }
)

router.get(
  '/:id',
  async (req: Request<FetchSingleRequestParams>, res: Response) => {
    const { id } = req.params

    const body: FetchSingleBody = {
      id: +id
    }

    const { success, error } = handleValidation(fetchTodoBodySchema, body)

    if (!success) {
      return res.json(error.format())
    }

    const todoRes = await db
      .select()
      .from(todos)
      .where(eq(todos.id, body.id))

    return res.json(todoRes[0])
  }
)

router.patch(
  '/:id',
  async (
    req: Request<PatchRequestParams, {}, PatchRequestBody, {}>,
    res: Response
  ) => {
    const { id } = req.params
    const { name, description, completed } = req.body

    const body: PatchRequestBody = {
      id: +id,
      name,
      description,
      completed
    }

    const { success, error } = handleValidation(patchTodoBodySchema, body)

    if (!success) {
      return res.json(error.format())
    }

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
  }
)

router.delete(
  '/:id',
  async (req: Request<DeleteRequestParams>, res: Response) => {
    const { id } = req.params

    const body: DeleteBody = {
      id: +id
    }

    const { success, error } = handleValidation(deleteTodoBodySchema, body)

    if (!success) {
      return res.json(error.format())
    }

    const todoRes = await db
      .select()
      .from(todos)
      .where(eq(todos.id, body.id))

    return res.json(todoRes[0])
  }
)

router.post(
  '/',
  async (req: Request<{}, {}, PostRequestBody>, res: Response) => {
    const { name, description } = req.body

    const body: PostRequestBody = {
      name,
      description
    }

    const { success, error } = handleValidation(postTodoBodySchema, body)

    if (!success) {
      return res.json(error.format())
    }

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
  }
)

export default router
