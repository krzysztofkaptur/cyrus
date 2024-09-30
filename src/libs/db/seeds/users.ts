import { faker } from '@faker-js/faker'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'

import { config } from '../../../config/default'
import { users } from '../schemas'

export async function seedUsers(db: BetterSQLite3Database) {
  for (let i = 0;i < config.usersCount;i++) {
    await db.insert(users).values({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.string.alpha({ length: { min: 5, max: 10 } }),
      created_at: faker.date.past(),
      updated_at: faker.date.future({ years: 1 }),
      phone: faker.phone.number({style: 'international'}),
      city: faker.location.city(),
      street: faker.location.street(),
      number: faker.location.buildingNumber(),
      zipcode: faker.location.zipCode(),
      avatar: faker.image.avatarGitHub()
    })
  }
}
