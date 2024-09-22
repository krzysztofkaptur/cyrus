import supertest from 'supertest'

import { createServer } from '../../utils/server'
import UsersService from '../../services/users'

const app = createServer()

describe('users', () => {
  test('fetch all users', async () => {
    const { body, statusCode } = await supertest(app).get('/api/v1/users')

    expect(statusCode).toBe(200)
    expect(body).toHaveProperty('prev')
    expect(body).toHaveProperty('next')
    expect(body).toHaveProperty('total')
    expect(body).toHaveProperty('results')
    expect(body.results.length).toBe(10)
  })

  test('fetch user by id', async () => {
    const usersRes = await UsersService.fetchAll({ page: 1, per_page: 1 })
    const { id } = usersRes.results[0]
    const { body, statusCode } = await supertest(app).get(`/api/v1/users/${id}`)

    expect(statusCode).toBe(200)
    expect(body.id).toBe(id)
  })

  test("fetch user that doesn't exist", async () => {
    const { body, statusCode } = await supertest(app).get(
      '/api/v1/users/doesnt_exist'
    )

    expect(statusCode).toBe(404)
    expect(body).toHaveProperty('message')
    expect(body).toHaveProperty('code')
  })

  test('update user', async () => {
    const editedName = 'edited'
    const usersRes = await UsersService.fetchAll({ page: 1, per_page: 1 })
    const { id } = usersRes.results[0]
    const { body, statusCode } = await supertest(app)
      .patch(`/api/v1/users/${id}`)
      .send({
        name: editedName
      })

    expect(statusCode).toBe(200)
    expect(body.name).toBe(editedName)
  })

  test("update user that doesn't exists", async () => {
    const { statusCode } = await supertest(app)
      .patch('/api/v1/users/doesnt_exist')
      .send({ name: 'editedName' })

    expect(statusCode).toBe(404)
  })

  test('delete user', async () => {
    const usersRes = await UsersService.fetchAll({ page: 1, per_page: 1 })
    const { id } = usersRes.results[0]
    const { body, statusCode } = await supertest(app).delete(
      `/api/v1/users/${id}`
    )

    expect(statusCode).toBe(200)
    expect(body.id).toBe(id)
  })

  test("delete user that doesn't exist", async () => {
    const { statusCode } = await supertest(app).delete(
      '/api/v1/users/doesnt_exist'
    )

    expect(statusCode).toBe(404)
  })

  test('add user', async () => {
    const email = 'test@test.com'
    const password = 'simple'
    const { body, statusCode } = await supertest(app)
      .post('/api/v1/users')
      .send({
        email,
        password
      })

    expect(statusCode).toBe(201)
    expect(body.email).toBe(email)
    expect(body.password).toBe(password)
  })
})
