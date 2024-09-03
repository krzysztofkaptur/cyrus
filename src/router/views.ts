import { Request, Response, Router } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  return res.render('pages/home')
})

router.get('/docs', (req: Request, res: Response) => {
  const routes = [
    {
      id: 'get_all_todos',
      title: 'Get all todos',
      code: `
        fetch('${process.env.BASE_URL}/api/v1/todos')
          .then(res=>res.json())
          .then(json=>console.log(json))
      `
    },
    {
      id: 'get_single_todo',
      title: 'Get a single todo',
      code: `
        fetch('${process.env.BASE_URL}/api/v1/todos/1')
          .then(res=>res.json())
          .then(json=>console.log(json))
      `
    },
    {
      id: 'add_todo',
      title: 'Add a todo',
      code: `
        fetch('${process.env.BASE_URL}/api/v1/todos', {
          method: "POST",
          body: JSON.stringify({
            name: "test",
            description: "test"
          })
        })
          .then(res=>res.json())
          .then(json=>console.log(json))
      `
    },
    {
      id: 'update_todo',
      title: 'Update a todo',
      code: `
        fetch('${process.env.BASE_URL}/api/v1/todos/1', {
          method: "PATCH",
          body: JSON.stringify({
            name: "test edited",
            description: "test edited",
            completed: true
          })
        })
          .then(res=>res.json())
          .then(json=>console.log(json))
      `
    },
    {
      id: 'delete_todo',
      title: 'Delete a todo',
      code: `
        fetch('${process.env.BASE_URL}/api/v1/todos/1', {
          method: "DELETE"
        })
          .then(res=>res.json())
          .then(json=>console.log(json))
      `
    }
  ]

  return res.render('pages/docs', { routes })
})

export default router
