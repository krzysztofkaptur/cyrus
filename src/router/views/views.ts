import { Router } from 'express'
import { renderDocsPage, renderLandingPage } from '../../controllers/views'

const router = Router()

router.get('/', renderLandingPage)
router.get('/docs', renderDocsPage)

export default router
