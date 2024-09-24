import { FetchAllBody } from '../controllers/types'

export interface CrudService<T, U, V> {
  fetchById: (id: string) => Promise<T>
  fetchAll: (
    query: FetchAllBody
  ) => Promise<{
    prev: string | null
    next: string | null
    total: number
    results: T[]
  }>
  create: (data: U) => Promise<T>
  update: (data: V) => Promise<T | null>
  delete: (id: string) => Promise<T | null>
}
