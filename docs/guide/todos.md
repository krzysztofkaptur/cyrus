---
outline: deep
---

<script setup lang="ts">
  const baseUrl = import.meta.env.VITE_BASE_URL
</script>

# Todos

## Get all todos

::: code-group

```js-vue [Request]
fetch('{{baseUrl}}/api/v1/todos')
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Response]
{
  "prev": null,
  "next": "/api/v1/todos?page=2&per_page=10",
  "total": 10,
  "results": [
    {
      "id": "6ab73730-525f-4a24-b6da-28712cf28d80",
      "created_at": "2024-01-07T22:53:28.000Z",
      "updated_at": "2025-01-24T11:22:52.000Z",
      "name": "commodo speciosus",
      "description": "At utilis usus optio tondeo.",
      "completed": 0
    },
    ...
  ]
}
```

:::

### Limit

Limits the returned results to specified number e.g. `limit=3`

::: code-group

```js-vue [Request]
fetch('{{baseUrl}}/api/v1/todos?limit=3')
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Response]
{
  "prev": null,
  "next": null,
  "total": 10,
  "results": [
    {
      "id": "6ab73730-525f-4a24-b6da-28712cf28d80",
      "created_at": "2024-01-07T22:53:28.000Z",
      "updated_at": "2025-01-24T11:22:52.000Z",
      "name": "commodo speciosus",
      "description": "At utilis usus optio tondeo.",
      "completed": 0
    },
    {
      "id": "6ab73730-525f-4a24-b6da-28712cf28d22",
      "created_at": "2024-01-07T22:53:28.000Z",
      "updated_at": "2025-01-24T11:22:52.000Z",
      "name": "acerbitas",
      "description": "Vesco eligendi surgo vulariter stipes synagoga.",
      "completed": 0
    },
    {
      "id": "6ab73730-525f-4a24-b6da-28712cf28d11",
      "created_at": "2024-01-07T22:53:28.000Z",
      "updated_at": "2025-01-24T11:22:52.000Z",
      "name": "vinitor placeat",
      "description": "Quisquam virtus aveho fugiat nam benigne studio.",
      "completed": 0
    }
  ]
}
```

:::

### Order

Sorts the returned results by specified property.
Properties: `name`, `completed`, `created_at`

::: code-group

```js-vue [Request (ascending)]
fetch(`{{baseUrl}}/api/v1/todos?order=name`)
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Request (descending)]
fetch('{{baseUrl}}/api/v1/todos?order=-name')
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Response]
{
  "prev": null,
  "next": null,
  "total": 10,
  "results": [
    {
      "id": "6ab73730-525f-4a24-b6da-28712cf28d22",
      "created_at": "2024-01-07T22:53:28.000Z",
      "updated_at": "2025-01-24T11:22:52.000Z",
      "name": "acerbitas",
      "description": "At utilis usus optio tondeo.",
      "completed": 0
    },
    {
      "id": "6ab73730-525f-4a24-b6da-28712cf28d30",
      "created_at": "2024-01-07T22:53:28.000Z",
      "updated_at": "2025-01-24T11:22:52.000Z",
      "name": "commodo speciosus",
      "description": "Vesco eligendi surgo vulariter stipes synagoga.",
      "completed": 0
    },
    {
      "id": "6ab73730-525f-4a24-b6da-28712cf28d45",
      "created_at": "2024-01-07T22:53:28.000Z",
      "updated_at": "2025-01-24T11:22:52.000Z",
      "name": "vinitor placeat",
      "description": "Quisquam virtus aveho fugiat nam benigne studio.",
      "completed": 0
    }
  ]
}
```

:::

### Pagination

Returns specified page with determined results count per page (default `per_page=10`)

::: code-group

```js-vue [Request]
fetch('{{baseUrl}}/api/v1/todos?per_page=3&page=2')
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Response]
{
  "prev": "/api/v1/todos?page=1",
  "next": "/api/v1/todos?page=3",
  "total": 10,
  "results": [
    {
      "id": "6ab73730-525f-4a24-b6da-28712cf28d80",
      "created_at": "2024-01-07T22:53:28.000Z",
      "updated_at": "2025-01-24T11:22:52.000Z",
      "name": "doloremque tricesimus aut",
      "description": "Exercitationem cicuta templum patruus.",
      "completed": 0
    },
    {
      "id": "6ab73730-525f-4a24-b6da-28712cf28d20",
      "created_at": "2024-01-07T22:53:28.000Z",
      "updated_at": "2025-01-24T11:22:52.000Z",
      "name": "volva demum",
      "description": "Aeneus desolo decipio victus pauci attonbitus auctor cura porro causa.",
      "completed": 0
    },
    {
      "id": "6ab73730-525f-4a24-b6da-28712cf28d30",
      "created_at": "2024-01-07T22:53:28.000Z",
      "updated_at": "2025-01-24T11:22:52.000Z",
      "name": "termes porro",
      "description": "Comedo commemoro ago demergo tergiversatio adopto cetera ex caecus denique.",
      "completed": 0
    }
  ]
}
```

:::

## Get a single todo

::: code-group

```js-vue [Request]
fetch('{{baseUrl}}/api/v1/todos/1')
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Response]
{
  "id": "6ab73730-525f-4a24-b6da-28712cf28d80",
  "created_at": "2024-01-07T22:53:28.000Z",
  "updated_at": "2025-01-24T11:22:52.000Z",
  "name": "commodo speciosus",
  "description": "At utilis usus optio tondeo.",
  "completed": 1
}
```

:::

## Add a todo

::: code-group

```js-vue [Request]
fetch('{{baseUrl}}/api/v1/todos', {
  method: "POST",
  body: JSON.stringify({
    name: "test",
    description: "test"
  })
})
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Response]
{
  "id": "6ab73730-525f-4a24-b6da-28712cf28d80",
  "created_at": "2024-01-07T22:53:28.000Z",
  "updated_at": "2025-01-24T11:22:52.000Z",
  "name": "commodo speciosus",
  "description": "At utilis usus optio tondeo.",
  "completed": 0
}
```

:::

## Update a todo

::: code-group

```js-vue [Request]
fetch('{{baseUrl}}/api/v1/todos/1', {
  method: "PATCH",
  body: JSON.stringify({
    name: "test edited",
    description: "test edited",
    completed: 1
  })
})
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Response]
{
  "id": "6ab73730-525f-4a24-b6da-28712cf28d80",
  "created_at": "2024-01-07T22:53:28.000Z",
  "updated_at": "2025-01-24T11:22:52.000Z",
  "name": "commodo speciosus",
  "description": "At utilis usus optio tondeo.",
  "completed": 0
}
```

:::

## Delete a todo

::: code-group

```js-vue [Request]
fetch('{{baseUrl}}/api/v1/todos/1', {
  method: "DELETE"
})
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Response]
{
  "id": "6ab73730-525f-4a24-b6da-28712cf28d80",
  "created_at": "2024-01-07T22:53:28.000Z",
  "updated_at": "2025-01-24T11:22:52.000Z",
  "name": "commodo speciosus",
  "description": "At utilis usus optio tondeo.",
  "completed": 0
}
```

:::
