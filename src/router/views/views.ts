import { Router } from 'express'
import { renderDocsPage, renderLandingPage } from '../../controllers/views'

const viewsRouter = Router()

viewsRouter.get('/', renderLandingPage)
viewsRouter.get('/docs', renderDocsPage)

export { viewsRouter }
