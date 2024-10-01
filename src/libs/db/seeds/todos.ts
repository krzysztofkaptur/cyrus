import { faker } from '@faker-js/faker'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'

import { config } from '../../../config/default'
import { todos } from '../schemas'

export async function seedTodos(db: BetterSQLite3Database) {
  for (let i = 0; i < config.todosCount; i++) {
    await db.insert(todos).values({
      name: faker.lorem.words({ min: 1, max: 3 }),
      description: faker.lorem.sentences({ max: 1, min: 1 }),
      completed: faker.number.int({ min: 0, max: 1 }),
      created_at: faker.date.past(),
      updated_at: faker.date.future({ years: 1 }),
    })
  }
}
