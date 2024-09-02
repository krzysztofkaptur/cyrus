import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import 'dotenv/config'

const pool = new Pool({
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})
const db = drizzle(pool)

export default db
