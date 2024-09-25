import { Request, Response } from 'express'

import TodosService from '../../services/todos'

import { PatchRequestBody, PostRequestBody } from './types'

import {
  FetchAllRequestQuery,
  PatchRequestParams,
  DeleteRequestParams
} from '../types'
import {
  FetchAllBody,
  FetchSingleRequestParams,
  FetchSingleBody,
  DeleteBody
} from '../types'

import {
  patchTodoBodySchema,
  addTodoBodySchema
} from '../../libs/validation/schema/todos'
import {
  fetchAllBodySchema,
  fetchSingleBodySchema,
  deleteBodySchema
} from '../../libs/validation/schema/general'

import { handleBodyValidation } from '../../libs/utils'
import { msgCodes } from '../../config/default'

class TodosController {
  async fetchAll(
    req: Request<unknown, unknown, unknown, FetchAllRequestQuery>,
    res: Response
  ) {
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

    const { prev, next, total, results } = await TodosService.fetchAll(body)

    return res.json({
      prev,
      next,
      total,
      results
    })
  }

  async fetchById(req: Request<FetchSingleRequestParams>, res: Response) {
    const { id } = req.params

    const body: FetchSingleBody = {
      id
    }

    const { success, error } = handleBodyValidation(fetchSingleBodySchema, body)

    if (!success) {
      return res.status(400).json(error.format())
    }

    const todoRes = await TodosService.fetchById(body.id)

    if (todoRes) {
      return res.json(todoRes)
    } else {
      return res.status(404).json({
        message: 'Not found',
        code: msgCodes.todoNotFound
      })
    }
  }

  async update(
    req: Request<PatchRequestParams, unknown, PatchRequestBody, unknown>,
    res: Response
  ) {
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

    const updatedTodo = await TodosService.update({
      id,
      name,
      description,
      completed
    })

    if (updatedTodo) {
      return res.json(updatedTodo)
    } else {
      return res.status(404).json({
        message: 'Not found',
        code: msgCodes.todoNotFound
      })
    }
  }

  async delete(req: Request<DeleteRequestParams>, res: Response) {
    const { id } = req.params

    const body: DeleteBody = {
      id
    }

    const { success, error } = handleBodyValidation(deleteBodySchema, body)

    if (!success) {
      return res.status(400).json(error.format())
    }

    const todoRes = await TodosService.delete(id)

    if (todoRes) {
      return res.json(todoRes)
    } else {
      return res.status(404).json({
        message: 'Not found',
        code: msgCodes.todoNotFound
      })
    }
  }

  async create(req: Request<unknown, unknown, PostRequestBody>, res: Response) {
    const { name, description } = req.body

    const body: PostRequestBody = {
      name,
      description
    }

    const { success, error } = handleBodyValidation(addTodoBodySchema, body)

    if (!success) {
      return res.status(400).json(error.format())
    }

    const newTodo = await TodosService.create({ name, description })

    return res.status(201).json(newTodo)
  }
}

export default new TodosController()
