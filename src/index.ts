import express from 'express'

import TodosRouter from './router/todos'
import ViewsRouter from './router/views'

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.json())
app.use('/', ViewsRouter)
app.use('/api/v1/todos', TodosRouter)

app.listen(process.env.PORT || 8000, () => console.log('server is up'))
