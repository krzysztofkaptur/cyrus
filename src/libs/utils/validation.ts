import { ZodObject, ZodRawShape } from 'zod'

export function handleBodyValidation<T extends ZodRawShape>(
  schema: ZodObject<T>,
  body: unknown
) {
  const validation = schema.safeParse(body)

  return validation
}
