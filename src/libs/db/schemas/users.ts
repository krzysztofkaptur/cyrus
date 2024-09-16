import { sql } from 'drizzle-orm'
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex
} from 'drizzle-orm/sqlite-core'

export const users = sqliteTable(
  'users',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    created_at: integer('created_at', { mode: 'timestamp' }),
    updated_at: integer('updated_at', { mode: 'timestamp' }),
    name: text('name', { length: 50 }),
    email: text('email', { length: 50 }).notNull(),
    password: text('password', { length: 256 }),
    phone: text('phone', { length: 20 }),
    city: text('city', { length: 50 }),
    street: text('street', { length: 100 }),
    number: text('number', { length: 10 }),
    zipcode: text('zipcode', { length: 10 })
  },
  table => ({
    emailUniqueIndex: uniqueIndex('emailUniqueIndex').on(
      sql`lower(${table.email})`
    )
  })
)
