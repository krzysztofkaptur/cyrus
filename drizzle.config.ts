import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/libs/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST as string,
    port: +process.env.DB_PORT!,
    database: process.env.DB_DATABASE as string,
    ssl: false
  },
  verbose: true,
  strict: true
})
