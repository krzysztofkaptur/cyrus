import { Request, Response } from 'express'
import TestimonialsService from '../../services/testimonials'
import { TestimonialsQuery } from './types'
import { handleBodyValidation } from '../../libs/utils'
import { fetchAllBodyLimitSchema } from '../../libs/validation/schema/general'

class TestimonialsController {
  async fetchAll(
    req: Request<unknown, unknown, unknown, TestimonialsQuery>,
    res: Response
  ) {
    const { limit } = req.query

    const body = {
      limit: +limit || undefined
    }

    const { success, error } = handleBodyValidation(
      fetchAllBodyLimitSchema,
      body
    )

    if (!success) {
      return res.status(400).json(error.format())
    }

    const { results } = await TestimonialsService.fetchAll(+limit || undefined)

    return res.json({ results })
  }
}

export default new TestimonialsController()
