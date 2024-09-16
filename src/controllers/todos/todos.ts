import { Request, Response } from 'express'
import { eq, ColumnMap, withParam, todos, db, count } from '../../libs/db'

import type {
  PatchRequestBody,
  PostRequestBody,
  Todo
} from './types'

import type { FetchAllRequestQuery, PatchRequestParams, DeleteRequestParams } from '../types'
import type { FetchAllBody, FetchSingleRequestParams, FetchSingleBody, DeleteBody } from '../types'

import {
  patchTodoBodySchema,
  addTodoBodySchema
} from '../../libs/validation/schema/todos'
import { fetchAllBodySchema, fetchSingleBodySchema, deleteBodySchema } from '../../libs/validation/schema/general'

import { handleBodyValidation } from '../../libs/utils'

export const fetchTodos = async (
  req: Request<{}, {}, {}, FetchAllRequestQuery>,
  res: Response
) => {
  const { limit, order, page = '1', per_page = '10' } = req.query

  const body: FetchAllBody = {
    limit: +limit || undefined,
    order,
    page: +page,
    per_page: +per_page
  }

  const { success, error } = handleBodyValidation(fetchAllBodySchema, body)

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

export const fetchTodo = async (
  req: Request<FetchSingleRequestParams>,
  res: Response
) => {
  const { id } = req.params

  const body: FetchSingleBody = {
    id
  }

  const { success, error } = handleBodyValidation(fetchSingleBodySchema, body)

  if (!success) {
    return res.json(error.format())
  }

  const todoRes = await db
    .select()
    .from(todos)
    .where(eq(todos.id, body.id))

  return res.json(todoRes[0])
}

export const updateTodo = async (
  req: Request<PatchRequestParams, {}, PatchRequestBody, {}>,
  res: Response
) => {
  const { id } = req.params
  const { name, description, completed } = req.body

  const body: PatchRequestBody = {
    id,
    name,
    description,
    completed
  }

  const { success, error } = handleBodyValidation(patchTodoBodySchema, body)

  if (!success) {
    return res.json(error.format())
  }

  const todoRes = await db
    .select()
    .from(todos)
    .where(eq(todos.id, id))

  const updatedTodo = {
    ...todoRes[0],
    name: name ?? todoRes[0].name,
    description: description ?? todoRes[0].description,
    completed: completed ?? todoRes[0].completed
  }

  return res.json(updatedTodo)
}

export const deleteTodo = async (
  req: Request<DeleteRequestParams>,
  res: Response
) => {
  const { id } = req.params

  const body: DeleteBody = {
    id
  }

  const { success, error } = handleBodyValidation(deleteBodySchema, body)

  if (!success) {
    return res.json(error.format())
  }

  const todoRes = await db
    .select()
    .from(todos)
    .where(eq(todos.id, body.id))

  return res.json(todoRes[0])
}

export const createTodo = async (
  req: Request<{}, {}, PostRequestBody>,
  res: Response
) => {
  const { name, description } = req.body

  const body: PostRequestBody = {
    name,
    description
  }

  const { success, error } = handleBodyValidation(addTodoBodySchema, body)

  if (!success) {
    return res.json(error.format())
  }

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    name,
    description,
    completed: 0,
    created_at: new Date(),
    updated_at: new Date()
  }

  return res.json(newTodo)
}
