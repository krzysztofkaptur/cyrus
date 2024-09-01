import express, { Request, Response } from 'express'

const app = express()

app.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'test' })
})

app.listen(process.env.PORT || 8000, () => console.log('server is up'))
