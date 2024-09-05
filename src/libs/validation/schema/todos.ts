import { z } from '../'

export const fetchTodosBodySchema = z.object({
  limit: z.number().optional(),
  order: z.string().optional(),
  page: z.number(),
  per_page: z.number()
})

export const fetchTodoBodySchema = z.object({
  id: z.number()
})

export const patchTodoBodySchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean()
})

export const deleteTodoBodySchema = z.object({
  id: z.number()
})

export const postTodoBodySchema = z.object({
  name: z.string(),
  description: z.string()
})
