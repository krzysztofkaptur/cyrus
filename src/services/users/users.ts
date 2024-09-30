import { FetchAllBody } from '../../controllers/types'
import {
  PatchRequestBody,
  PostRequestBody,
  User
} from '../../controllers/users/types'
import { ColumnMap, withParam, users, db, count, eq } from '../../libs/db'
import { CrudService } from '../types'

class UsersService
  implements CrudService<User, PostRequestBody, PatchRequestBody> {
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

  // create function without changes to DB
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

  // create function with changes to DB
  // async create({ email, password }: PostRequestBody) {
  //   const newUser = await db
  //     .insert(users)
  //     .values({
  //       email,
  //       password,
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //       number: null,
  //       name: null,
  //       phone: null,
  //       city: null,
  //       street: null,
  //       zipcode: null
  //     })
  //     .returning()

  //   return newUser[0]
  // }

  // update function without changes to DB
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

  // update function with changes to DB
  // async update({
  //   id,
  //   name,
  //   phone,
  //   city,
  //   street,
  //   number,
  //   zipcode
  // }: PatchRequestBody) {
  //   const updatedTodo = await db
  //     .update(users)
  //     .set({
  //       name,
  //       phone,
  //       city,
  //       street,
  //       number,
  //       zipcode
  //     })
  //     .where(eq(users.id, id))
  //     .returning()

  //   return updatedTodo[0]
  // }

  // delete function without changes to DB
  async delete(id: string) {
    const userRes = await this.fetchById(id)

    if (!userRes) {
      return null
    }

    return userRes
  }

  // delete function with changes to DB
  // async delete(id: string) {
  //   const deletedUser = await db
  //     .delete(users)
  //     .where(eq(users.id, id))
  //     .returning()

  //   return deletedUser[0]
  // }
}

export default new UsersService()
