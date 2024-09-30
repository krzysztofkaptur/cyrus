import {
  PatchRequestBody,
  PostRequestBody,
  Todo
} from '../../controllers/todos/types'
import { FetchAllBody } from '../../controllers/types'
import { eq, ColumnMap, withParam, todos, db, count } from '../../libs/db'
import { CrudService } from '../types'

class TodosService
  implements CrudService<Todo, PostRequestBody, PatchRequestBody> {
  async fetchById(id: string) {
    const todoRes = await db
      .select()
      .from(todos)
      .where(eq(todos.id, id))

    return todoRes[0]
  }

  async fetchAll({ limit, per_page, page, order }: FetchAllBody) {
    const offset = (page - 1) * per_page

    const countResult = await db
      .select({
        count: count()
      })
      .from(todos)

    const queryBuild = db
      .select()
      .from(todos)
      .limit(limit || per_page || -1)
      .offset(offset)
      .$dynamic()

    const columnMap: ColumnMap = {
      name: todos.name,
      completed: todos.completed,
      created_at: todos.created_at
    }

    const total = countResult[0].count
    const totalPages = Math.ceil(total / per_page)

    const results = await withParam(queryBuild, order as string, columnMap)

    const prev = page === 1 ? null : `/api/v1/todos?page=${page - 1}`
    const next = page + 1 > totalPages ? null : `/api/v1/todos?page=${page + 1}`

    return {
      prev,
      next,
      total,
      results
    }
  }

  // create function without changes to DB
  async create({ name, description }: PostRequestBody) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      name,
      description: description || null,
      completed: 0,
      created_at: new Date(),
      updated_at: new Date()
    }

    return newTodo
  }

  // create function with changes to DB
  // async create({ name, description }: PostRequestBody) {
  //   const newTodo = await db
  //     .insert(todos)
  //     .values({
  //       name,
  //       description,
  //       completed: 0,
  //       created_at: new Date(),
  //       updated_at: new Date()
  //     })
  //     .returning()

  //   return newTodo[0]
  // }

  // update function without changes to DB
  async update({ id, name, description, completed }: PatchRequestBody) {
    const todoRes = await this.fetchById(id)

    if (!todoRes) {
      return null
    }

    const updatedTodo: Todo = {
      ...todoRes,
      name: name ?? todoRes.name,
      description: description ?? todoRes.description,
      completed: completed ?? todoRes.completed
    }

    return updatedTodo
  }

  // update function with changes to DB
  // async update({ id, name, description, completed }: PatchRequestBody) {
  //   const updatedTodo = await db
  //     .update(todos)
  //     .set({
  //       name,
  //       description,
  //       completed
  //     })
  //     .where(eq(todos.id, id))
  //     .returning()

  //   return updatedTodo[0]
  // }

  // delete function without changes to DB
  async delete(id: string) {
    const todoRes = await this.fetchById(id)

    if (!todoRes) {
      return null
    }

    return todoRes
  }

  // delete function with changes to DB
  // async delete(id: string) {
  //   const deletedTodo = await db.delete(todos).where(eq(todos.id, id)).returning()

  //   return deletedTodo[0]
  // }
}

export default new TodosService()
