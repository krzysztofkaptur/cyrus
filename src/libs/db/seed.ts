import { faker } from '@faker-js/faker'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

import { todos } from './schema'
import { config } from '../../config/default'

const sqlite = new Database('sqlite.db')
const db = drizzle(sqlite)

async function main() {
  console.log('cleaning db')
  await db.delete(todos)

  console.log('seeding started')

  for (let i = 0; i < config.todosCount; i++) {
    const todoName = faker.lorem.words({ min: 1, max: 3 })
    const todoDescription = faker.lorem.sentences({ max: 1, min: 1 })
    const todoCompleted = faker.number.int({ min: 0, max: 1 })
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
