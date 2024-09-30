import { Router } from 'express'
import TestimonialsController from '../../controllers/testimonials'

const testimonialsRouter = Router()

testimonialsRouter.get('/', TestimonialsController.fetchAll)

export { testimonialsRouter }
