import { faker } from '@faker-js/faker'
import { todos } from './schema'
import { drizzle, Pool } from './'

import 'dotenv/config'

const pool = new Pool({
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

const db = drizzle(pool)

async function main() {
  console.log('cleaning db')
  await db.delete(todos)

  console.log('seeding started')

  for (let i = 0; i < 10; i++) {
    const todoName = faker.lorem.words({ min: 1, max: 3 })
    const todoDescription = faker.lorem.sentences({ max: 1, min: 1 })
    const todoCompleted = faker.datatype.boolean()
    const todoCreatedAt = faker.date.past()
    const todoUpdatedAt = faker.date.future({ years: 1 })

    await db.insert(todos).values({
      // todo: fix typescript error
      // @ts-ignore
      name: todoName,
      description: todoDescription,
      completed: todoCompleted,
      created_at: todoCreatedAt,
      updated_at: todoUpdatedAt
    })
  }

  console.log('seending completed')
}

main()
  .then(() => process.exit(1))
  .catch(err => {
    console.log(err)
    process.exit(0)
  })
