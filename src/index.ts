import express from 'express'

import TodosRouter from './router/todos'

const app = express()

app.use('/api/v1/todos', TodosRouter)

app.listen(process.env.PORT || 8000, () => console.log('server is up'))
