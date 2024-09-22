import { Request, Response } from 'express'
import { todos, users } from './data'

class ViewsController {
  renderLandingPage(_req: Request, res: Response) {
    return res.render('pages/home', { path: '/' })
  }

  renderDocsPage(_req: Request, res: Response) {
    return res.render('pages/docs', { todos, users, path: '/docs' })
  }
}

export default new ViewsController()
