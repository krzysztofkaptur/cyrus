import { InferSelectModel, todos } from '../../libs/db'

import { z } from '../../libs/validation'
import {
  deleteTodoBodySchema,
  fetchTodoBodySchema,
  fetchTodosBodySchema,
  patchTodoBodySchema,
  postTodoBodySchema
} from '../../libs/validation/schema/todos'

export type Todo = InferSelectModel<typeof todos>

export type FetchAllRequestQuery = {
  limit: string
  order: string
  page: string
  per_page: string
}

export type FetchAllBody = z.infer<typeof fetchTodosBodySchema>

export type FetchSingleRequestParams = {
  id: string
}

export type FetchSingleBody = z.infer<typeof fetchTodoBodySchema>

export type PatchRequestParams = {
  id: string
}

export type PatchRequestBody = z.infer<typeof patchTodoBodySchema>

export type DeleteRequestParams = {
  id: string
}

export type DeleteBody = z.infer<typeof deleteTodoBodySchema>

export type PostRequestBody = z.infer<typeof postTodoBodySchema>
