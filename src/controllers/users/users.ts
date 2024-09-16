import { Request, Response } from 'express'
import { ColumnMap, withParam, users, db, count, eq } from '../../libs/db'

import { handleBodyValidation } from '../../libs/utils'

import type { FetchAllRequestQuery, FetchSingleRequestParams, FetchSingleBody, PatchRequestParams } from '../types'
import { fetchAllBodySchema, fetchSingleBodySchema, deleteBodySchema } from '../../libs/validation/schema/general'
import { FetchAllBody, DeleteRequestParams, DeleteBody } from '../types'
import { PatchRequestBody, PostRequestBody, User } from './types'
import { addUserBodySchema, patchUserBodySchema } from '../../libs/validation/schema/users'

export const fetchUsers = async (
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
  const countResult = await db.select({ count: count() }).from(users)

  const queryBuild = db
    .select()
    .from(users)
    .limit(body.limit || body.per_page || -1)
    .offset(offset)
    .$dynamic()

  const columnMap: ColumnMap = {
    name: users.name,
    email: users.email,
    created_at: users.created_at,
    city: users.city,
    street: users.street,
    zipcode: users.zipcode,
  }

  const total = countResult[0].count
  const totalPages = Math.ceil(total / body.per_page)

  const results = await withParam(queryBuild, order as string, columnMap)

  const prev = body.page === 1 ? null : `/api/v1/users?page=${body.page - 1}`
  const next =
    body.page + 1 > totalPages ? null : `/api/v1/users?page=${body.page + 1}`

  return res.json({
    prev,
    next,
    total,
    results
  })
}

export const fetchUser = async (
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
    .from(users)
    .where(eq(users.id, body.id))

  return res.json(todoRes[0])
}

export const deleteUser = async (
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
    .from(users)
    .where(eq(users.id, body.id))

  return res.json(todoRes[0])
}

export const createUser = async (
  req: Request<{}, {}, PostRequestBody>,
  res: Response
) => {
  const { email, password } = req.body

  const body: PostRequestBody = {
    email,
    password
  }

  const { success, error } = handleBodyValidation(addUserBodySchema, body)

  if (!success) {
    return res.json(error.format())
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    password,
    created_at: new Date(),
    updated_at: new Date(),
    number: null,
    name: null,
    phone: null,
    city: null,
    street: null,
    zipcode: null
  }

  return res.json(newUser)
}

export const updateUser = async (
  req: Request<PatchRequestParams, {}, PatchRequestBody, {}>,
  res: Response
) => {
  const { id } = req.params
  const { name, phone, city, street, number,zipcode } = req.body

  const body: PatchRequestBody = {
    id,
    name,
    phone,
    city,
    street,
    number,
    zipcode
  }

  const { success, error } = handleBodyValidation(patchUserBodySchema, body)

  if (!success) {
    return res.json(error.format())
  }

  const userRes = await db
    .select()
    .from(users)
    .where(eq(users.id, id))

  const updatedTodo = {
    ...userRes[0],
    name: name ?? userRes[0].name,
    phone: phone ?? userRes[0].phone,
    city: city ?? userRes[0].city,
    street: street ?? userRes[0].street,
    number: number ?? userRes[0].number,
    zipcode: zipcode ?? userRes[0].zipcode,
  }

  return res.json(updatedTodo)
}