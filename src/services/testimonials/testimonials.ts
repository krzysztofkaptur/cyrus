import { db, testimonials } from '../../libs/db'

class TestimonialsService {
  async fetchAll(limit?: number) {
    const results = await db
      .select()
      .from(testimonials)
      .limit(limit || -1)

    return {
      results,
    }
  }
}

export default new TestimonialsService()
