import { Request, Response } from 'express'

import { handleBodyValidation } from '../../libs/utils'

import type {
  FetchAllRequestQuery,
  FetchSingleRequestParams,
  FetchSingleBody,
  PatchRequestParams
} from '../types'
import {
  fetchAllBodySchema,
  fetchSingleBodySchema,
  deleteBodySchema
} from '../../libs/validation/schema/general'
import { FetchAllBody, DeleteRequestParams, DeleteBody } from '../types'
import { PatchRequestBody, PostRequestBody } from './types'
import {
  addUserBodySchema,
  patchUserBodySchema
} from '../../libs/validation/schema/users'
import UsersService from '../../services/users'

class UsersController {
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
      return res.json(error.format())
    }

    const { prev, next, total, results } = await UsersService.fetchAll(body)

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
      return res.json(error.format())
    }

    const userRes = await UsersService.fetchById(id)

    if (userRes) {
      return res.json(userRes)
    } else {
      return res.status(404).json({
        message: 'Not found',
        code: 'user_not_found'
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
      return res.json(error.format())
    }

    const userRes = await UsersService.fetchById(id)

    if (userRes) {
      return res.json(userRes)
    } else {
      return res.status(404).json({
        message: 'Not found',
        code: 'user_not_found'
      })
    }
  }

  async create(req: Request<unknown, unknown, PostRequestBody>, res: Response) {
    const { email, password } = req.body

    const body: PostRequestBody = {
      email,
      password
    }

    const { success, error } = handleBodyValidation(addUserBodySchema, body)

    if (!success) {
      return res.json(error.format())
    }

    const newUser = await UsersService.create({ email, password })

    return res.status(201).json(newUser)
  }

  async update(
    req: Request<PatchRequestParams, unknown, PatchRequestBody, unknown>,
    res: Response
  ) {
    const { id } = req.params
    const { name, phone, city, street, number, zipcode } = req.body

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

    const updatedUser = await UsersService.update(body)

    if (updatedUser) {
      return res.json(updatedUser)
    } else {
      return res.status(404).json({
        message: 'Not found',
        code: 'user_not_found'
      })
    }
  }
}

export default new UsersController()
