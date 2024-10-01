import { z } from '../'

// todo: add extra validation based on the schema min, max etc.
export const patchUserBodySchema = z.object({
  id: z.string(),
  name: z.string().max(50).optional(),
  phone: z.string().max(20).optional(),
  city: z.string().max(50).optional(),
  street: z.string().max(100).optional(),
  number: z.string().max(10).optional(),
  zipcode: z.string().max(10).optional(),
  avatar: z.string().max(256).optional(),
})

export const addUserBodySchema = z.object({
  email: z.string().max(50),
  password: z.string().max(50),
})
