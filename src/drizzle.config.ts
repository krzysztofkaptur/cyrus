import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/libs/db/schemas/*.ts',
  dialect: 'sqlite',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: './sqlite.db',
  },
})
