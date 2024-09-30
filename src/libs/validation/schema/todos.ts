import { z } from '../'

// todo: add extra validation based on the schema min, max etc.
export const patchTodoBodySchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  completed: z
    .number()
    .int()
    .min(0)
    .max(1)
    .optional()
})

export const addTodoBodySchema = z.object({
  name: z.string(),
  description: z.string().optional()
})
