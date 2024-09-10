import { Request, Response } from 'express'

export const renderLandingPage = (req: Request, res: Response) => {
  return res.render('pages/home', { path: '/' })
}

export const renderDocsPage = (req: Request, res: Response) => {
  const routes = [
    {
      id: 'get_all_todos',
      title: 'Get all todos',
      code: `
        fetch('${process.env.BASE_URL}/api/v1/todos')
          .then(res=>res.json())
          .then(json=>console.log(json))
      `,
      responseExample: `
        {
          "prev": null,
          "next": "/api/v1/todos?page=2&per_page=10",
          "total": 10,
          "results": [
            {
              "id": 58,
              "created_at": "2024-08-26",
              "updated_at": "2024-09-04",
              "name": "commodo speciosus",
              "description": "At utilis usus optio tondeo.",
              "completed": true
            },
            ...
          ]
        }
      `
    },
    {
      id: 'get_single_todo',
      title: 'Get a single todo',
      code: `
        fetch('${process.env.BASE_URL}/api/v1/todos/1')
          .then(res=>res.json())
          .then(json=>console.log(json))
      `,
      responseExample: `
        {
          "id": 58,
          "created_at": "2024-08-26",
          "updated_at": "2024-09-04",
          "name": "commodo speciosus",
          "description": "At utilis usus optio tondeo.",
          "completed": true
        }
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
      `,
      responseExample: `
        {
          "id": 58,
          "created_at": "2024-08-26",
          "updated_at": "2024-09-04",
          "name": "commodo speciosus",
          "description": "At utilis usus optio tondeo.",
          "completed": true
        }
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
      `,
      responseExample: `
        {
          "id": 58,
          "created_at": "2024-08-26",
          "updated_at": "2024-09-04",
          "name": "commodo speciosus",
          "description": "At utilis usus optio tondeo.",
          "completed": true
        }
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
      `,
      responseExample: `
        {
          "id": 58,
          "created_at": "2024-08-26",
          "updated_at": "2024-09-04",
          "name": "commodo speciosus",
          "description": "At utilis usus optio tondeo.",
          "completed": true
        }
      `
    },
    {
      id: 'get_all_todos_limit',
      title: 'Get all todos - limit',
      code: `
        fetch('${process.env.BASE_URL}/api/v1/todos?limit=3')
          .then(res=>res.json())
          .then(json=>console.log(json))
      `,
      responseExample: `
        {
          "prev": null,
          "next": null,
          "total": 10,
          "results": [
            {
              "id": 58,
              "created_at": "2024-08-26",
              "updated_at": "2024-09-04",
              "name": "commodo speciosus",
              "description": "At utilis usus optio tondeo.",
              "completed": true
            },
            {
              "id": 59,
              "created_at": "2023-11-16",
              "updated_at": "2025-08-01",
              "name": "acerbitas",
              "description": "Vesco eligendi surgo vulariter stipes synagoga.",
              "completed": true
            },
            {
              "id": 60,
              "created_at": "2023-09-19",
              "updated_at": "2025-08-17",
              "name": "vinitor placeat",
              "description": "Quisquam virtus aveho fugiat nam benigne studio.",
              "completed": false
            }
          ]
        }
      `
    },
    {
      id: 'get_all_todos_order',
      title: 'Get all todos - order by id',
      code: `
        fetch('${process.env.BASE_URL}/api/v1/todos?order=id')
          .then(res=>res.json())
          .then(json=>console.log(json))
      `,
      responseExample: `
        {
          "prev": null,
          "next": null,
          "total": 10,
          "results": [
            {
              "id": 58,
              "created_at": "2024-08-26",
              "updated_at": "2024-09-04",
              "name": "commodo speciosus",
              "description": "At utilis usus optio tondeo.",
              "completed": true
            },
            {
              "id": 59,
              "created_at": "2023-11-16",
              "updated_at": "2025-08-01",
              "name": "acerbitas",
              "description": "Vesco eligendi surgo vulariter stipes synagoga.",
              "completed": true
            },
            {
              "id": 60,
              "created_at": "2023-09-19",
              "updated_at": "2025-08-17",
              "name": "vinitor placeat",
              "description": "Quisquam virtus aveho fugiat nam benigne studio.",
              "completed": false
            }
          ]
        }
      `
    },
    {
      id: 'get_all_todos_pagination',
      title: 'Get all todos - pagination',
      code: `
        fetch('${process.env.BASE_URL}/api/v1/todos?per_page=3&page=2')
          .then(res=>res.json())
          .then(json=>console.log(json))
      `,
      responseExample: `
        {
          "prev": "/api/v1/todos?page=1",
          "next": "/api/v1/todos?page=3",
          "total": 10,
          "results": [
            {
              "id": 61,
              "created_at": "2024-08-09",
              "updated_at": "2025-03-21",
              "name": "doloremque tricesimus aut",
              "description": "Exercitationem cicuta templum patruus.",
              "completed": true
            },
            {
              "id": 62,
              "created_at": "2024-01-16",
              "updated_at": "2025-01-30",
              "name": "volva demum",
              "description": "Aeneus desolo decipio victus pauci attonbitus auctor cura porro causa.",
              "completed": false
            },
            {
              "id": 63,
              "created_at": "2024-03-27",
              "updated_at": "2025-06-03",
              "name": "termes porro",
              "description": "Comedo commemoro ago demergo tergiversatio adopto cetera ex caecus denique.",
              "completed": true
            }
          ]
        }
      `
    }
  ]

  return res.render('pages/docs', { routes, path: '/docs' })
}
