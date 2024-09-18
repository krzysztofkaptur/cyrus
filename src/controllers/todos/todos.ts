import { Request, Response } from 'express'

import todoService from '../../services/todos'

import type {
  PatchRequestBody,
  PostRequestBody,
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
    return res.status(400).json(error.format())
  }

  const {prev, next, total, results} = await todoService.fetchTodos(body)

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
    return res.status(400).json(error.format())
  }

  const todoRes = await todoService.fetchTodo(body.id)

  if (todoRes) {
    return res.json(todoRes)
  } else {
    return res.status(404).json({
      message: "Not found",
      code: "todo_not_found"
    })
  }
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
    return res.status(400).json(error.format())
  }

  const updatedTodo = await todoService.updateTodo({ id, name, description, completed })

  if (updatedTodo) {
    return res.json(updatedTodo)
  } else {
    return res.status(404).json({
      message: "Not found",
      code: "todo_not_found"
    })
  }
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
    return res.status(400).json(error.format())
  }

  const todoRes = await todoService.deleteTodo(id)

  if (todoRes) {
    return res.json(todoRes)
  } else {
    return res.status(404).json({
      message: "Not found",
      code: "todo_not_found"
    })
  }
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
    return res.status(400).json(error.format())
  }

  const newTodo = await todoService.createTodo({name, description})

  return res.status(201).json(newTodo)
}
