import supertest from 'supertest'

import { createServer } from '../../utils/server'
import TodosService from '../../services/todos'

const app = createServer()

// todo: add tests for failures
describe('todos', () => {
  test('fetch all todos', async () => {
    const { body, statusCode } = await supertest(app).get('/api/v1/todos')

    expect(statusCode).toBe(200)
    expect(body).toHaveProperty('prev')
    expect(body).toHaveProperty('next')
    expect(body).toHaveProperty('total')
    expect(body).toHaveProperty('results')
    expect(body.results.length).toBe(10)
  })

  test('fetch todo by id', async () => {
    const todosRes = await TodosService.fetchAll({ page: 1, per_page: 1 })
    const { id } = todosRes.results[0]
    const { body, statusCode } = await supertest(app).get(`/api/v1/todos/${id}`)

    expect(statusCode).toBe(200)
    expect(body.id).toBe(id)
  })

  test('fetch todo by wrong id', async () => {
    const id = 'test_id'
    const { body, statusCode } = await supertest(app).get(`/api/v1/todos/${id}`)

    expect(statusCode).toBe(404)
    expect(body).toHaveProperty('message')
    expect(body).toHaveProperty('code')
  })

  test('update todo', async () => {
    const todosRes = await TodosService.fetchAll({ page: 1, per_page: 1 })
    const { id } = todosRes.results[0]
    const editedName = 'Edited'
    const { body, statusCode } = await supertest(app)
      .patch(`/api/v1/todos/${id}`)
      .send({ name: editedName })

    expect(statusCode).toBe(200)
    expect(body.id).toBe(id)
    expect(body.name).toBe(editedName)
  })

  test("update todo that doesn't exists", async () => {
    const { statusCode } = await supertest(app)
      .patch('/api/v1/todos/doesnt_exist')
      .send({ name: 'editedName' })

    expect(statusCode).toBe(404)
  })

  test('delete todo', async () => {
    const todosRes = await TodosService.fetchAll({ page: 1, per_page: 1 })
    const { id } = todosRes.results[0]
    const { body, statusCode } = await supertest(app).delete(
      `/api/v1/todos/${id}`
    )

    expect(statusCode).toBe(200)
    expect(body.id).toBe(id)
  })

  test("delete todo that doesn't exist", async () => {
    const { statusCode } = await supertest(app).delete(
      '/api/v1/todos/doesnt_exist'
    )

    expect(statusCode).toBe(404)
  })

  test('add todo', async () => {
    const sampleName = 'new todo'
    const sampleDescription = 'new todo description'
    const { statusCode } = await supertest(app).post('/api/v1/todos').send({
      name: sampleName,
      description: sampleDescription
    })

    expect(statusCode).toBe(201)
  })

  test('add todo without body', async () => {
    const { statusCode } = await supertest(app).post('/api/v1/todos')

    expect(statusCode).toBe(400)
  })
})
