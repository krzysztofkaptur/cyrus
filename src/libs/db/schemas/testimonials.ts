import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const testimonials = sqliteTable('testimonials', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  created_at: integer('created_at', { mode: 'timestamp' }),
  updated_at: integer('updated_at', { mode: 'timestamp' }),
  name: text('name', { length: 50 }),
  avatar: text('avatar', { length: 256 }),
  text: text('text', { length: 256 })
})
