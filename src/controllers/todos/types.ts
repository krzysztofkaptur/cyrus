import { InferSelectModel, todos } from '../../libs/db'

import { z } from '../../libs/validation'
import {
  patchTodoBodySchema,
  addTodoBodySchema,
} from '../../libs/validation/schema/todos'

export type Todo = InferSelectModel<typeof todos>

export type PatchRequestBody = z.infer<typeof patchTodoBodySchema>

export type PostRequestBody = z.infer<typeof addTodoBodySchema>
