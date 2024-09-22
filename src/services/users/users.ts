import { FetchAllBody } from '../../controllers/types'
import {
  PatchRequestBody,
  PostRequestBody,
  User
} from '../../controllers/users/types'
import { ColumnMap, withParam, users, db, count, eq } from '../../libs/db'

class UsersService {
  async fetchAll({ page, per_page, limit, order }: FetchAllBody) {
    const offset = (page - 1) * per_page

    const countResult = await db.select({ count: count() }).from(users)

    const queryBuild = db
      .select()
      .from(users)
      .limit(limit || per_page || -1)
      .offset(offset)
      .$dynamic()

    const columnMap: ColumnMap = {
      name: users.name,
      email: users.email,
      created_at: users.created_at,
      city: users.city,
      street: users.street,
      zipcode: users.zipcode
    }

    const total = countResult[0].count
    const totalPages = Math.ceil(total / per_page)

    const results = await withParam(queryBuild, order as string, columnMap)

    const prev = page === 1 ? null : `/api/v1/users?page=${page - 1}`
    const next = page + 1 > totalPages ? null : `/api/v1/users?page=${page + 1}`

    return {
      prev,
      next,
      total,
      results
    }
  }

  async fetchById(id: string) {
    const todoRes = await db
      .select()
      .from(users)
      .where(eq(users.id, id))

    return todoRes[0]
  }

  async create({ email, password }: PostRequestBody) {
    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
      number: null,
      name: null,
      phone: null,
      city: null,
      street: null,
      zipcode: null
    }

    return newUser
  }

  async update({
    id,
    name,
    phone,
    city,
    street,
    number,
    zipcode
  }: PatchRequestBody) {
    const userRes = await this.fetchById(id)

    if (!userRes) {
      return null
    }

    const updatedTodo = {
      ...userRes,
      name: name ?? userRes?.name,
      phone: phone ?? userRes?.phone,
      city: city ?? userRes?.city,
      street: street ?? userRes?.street,
      number: number ?? userRes?.number,
      zipcode: zipcode ?? userRes?.zipcode
    }

    return updatedTodo
  }
}

export default new UsersService()
