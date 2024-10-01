import { faker } from '@faker-js/faker'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'

import { config } from '../../../config/default'
import { testimonials } from '../schemas'

export async function seedTestimonials(db: BetterSQLite3Database) {
  for (let i = 0; i < config.testimonialsCount; i++) {
    await db.insert(testimonials).values({
      name: faker.person.fullName(),
      created_at: faker.date.past(),
      updated_at: faker.date.future({ years: 1 }),
      avatar: faker.image.avatarGitHub(),
      text: faker.lorem.sentence(),
    })
  }
}
