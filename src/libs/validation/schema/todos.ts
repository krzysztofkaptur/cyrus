import { z } from '../'

export const fetchTodosBodySchema = z.object({
  limit: z.number().optional(),
  order: z.string().optional(),
  page: z.number(),
  per_page: z.number()
})

export const fetchTodoBodySchema = z.object({
  id: z.string()
})

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

export const deleteTodoBodySchema = z.object({
  id: z.string()
})

export const postTodoBodySchema = z.object({
  name: z.string(),
  description: z.string()
})
