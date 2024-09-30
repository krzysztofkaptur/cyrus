import { z } from '../'

export const fetchAllBodySchema = z.object({
  limit: z.number().optional(),
  order: z.string().optional(),
  page: z.number(),
  per_page: z.number()
})

export const fetchSingleBodySchema = z.object({
  id: z.string()
})

export const deleteBodySchema = z.object({
  id: z.string()
})

export const fetchAllBodyLimitSchema = z.object({
  limit: z.number().optional()
})
