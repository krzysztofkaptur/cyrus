import { z } from '../libs/validation'
import {
  fetchAllBodySchema,
  fetchSingleBodySchema,
  deleteBodySchema
} from '../libs/validation/schema/general'

export type FetchAllRequestQuery = {
  limit: string
  order: string
  page: string
  per_page: string
}
export type FetchAllBody = z.infer<typeof fetchAllBodySchema>

export type FetchSingleRequestParams = {
  id: string
}

export type FetchSingleBody = z.infer<typeof fetchSingleBodySchema>

export type PatchRequestParams = {
  id: string
}

export type DeleteRequestParams = {
  id: string
}

export type DeleteBody = z.infer<typeof deleteBodySchema>
