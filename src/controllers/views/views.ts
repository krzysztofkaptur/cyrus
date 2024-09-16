import { Request, Response } from 'express'
import { todos, users } from './data'

export const renderLandingPage = (req: Request, res: Response) => {
  return res.render('pages/home', { path: '/' })
}

export const renderDocsPage = (req: Request, res: Response) => {
  return res.render('pages/docs', { todos, users, path: '/docs' })
}
