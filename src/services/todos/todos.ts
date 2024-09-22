import {
  PatchRequestBody,
  PostRequestBody,
  Todo
} from '../../controllers/todos/types'
import { FetchAllBody } from '../../controllers/types'
import { eq, ColumnMap, withParam, todos, db, count } from '../../libs/db'

class TodosService {
  async fetchById(id: string) {
    const todoRes = await db.select().from(todos).where(eq(todos.id, id))

    return todoRes[0]
  }

  async fetchAll({ limit, per_page, page, order }: FetchAllBody) {
    const offset = (page - 1) * per_page

    // todo: move it to one query
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

  async create({ name, description }: PostRequestBody) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      name,
      description,
      completed: 0,
      created_at: new Date(),
      updated_at: new Date()
    }

    return newTodo
  }

  async update({ id, name, description, completed }: PatchRequestBody) {
    const todoRes = await this.fetchById(id)

    if (!todoRes) {
      return null
    }

    const updatedTodo = {
      ...todoRes,
      name: name ?? todoRes.name,
      description: description ?? todoRes.description,
      completed: completed ?? todoRes.completed
    }

    return updatedTodo
  }

  async delete(id: string) {
    const todoRes = await this.fetchById(id)

    if (!todoRes) {
      return null
    }

    return todoRes
  }
}

export default new TodosService()
