import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const todos = sqliteTable('todos', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  created_at: integer('created_at', { mode: 'timestamp' }),
  updated_at: integer('updated_at', { mode: 'timestamp' }),
  name: text('name', { length: 50 }).notNull(),
  description: text('description', { length: 256 }),
  completed: integer('completed'),
})
