import { Router } from 'express'
import ViewsController from '../../controllers/views'

const viewsRouter = Router()

viewsRouter.get('/', ViewsController.renderLandingPage)
viewsRouter.get('/docs', ViewsController.renderDocsPage)

export { viewsRouter }
