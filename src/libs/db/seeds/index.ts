import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

import { todos, users } from '../schemas'
import { seedTodos } from './todos'
import { seedUsers } from './users'
import { seedTestimonials } from './testimonials'

const sqlite = new Database('sqlite.db')
const db = drizzle(sqlite)

async function main() {
  console.log('cleaning db')
  await db.delete(todos)
  await db.delete(users)

  console.log('seeding started')

  await seedTodos(db)
  await seedUsers(db)
  await seedTestimonials(db)

  console.log('seending completed')
}

main()
  .then(() => process.exit(1))
  .catch((err) => {
    console.log(err)
    process.exit(0)
  })
