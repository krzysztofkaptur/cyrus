import { users, InferSelectModel } from '../../libs/db'
import { z } from '../../libs/validation'
import {
  addUserBodySchema,
  patchUserBodySchema
} from '../../libs/validation/schema/users'

export type PostRequestBody = z.infer<typeof addUserBodySchema>

export type User = InferSelectModel<typeof users>

export type PatchRequestBody = z.infer<typeof patchUserBodySchema>
