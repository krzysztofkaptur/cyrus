import { pgTable, serial, varchar, boolean, date } from 'drizzle-orm/pg-core'

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  created_at: date('created_at'),
  updated_at: date('updated_at'),
  name: varchar('name', { length: 50 }).notNull(),
  description: varchar('description', { length: 256 }),
  completed: boolean('completed')
})
