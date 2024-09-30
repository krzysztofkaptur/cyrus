---
outline: deep
---

<script setup lang="ts">
  const baseUrl = import.meta.env.VITE_BASE_URL
</script>

# Testimonials

## Get all testimonials

::: code-group

```js-vue [Request]
fetch('{{baseUrl}}/api/v1/testimonials')
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Response]
{
  "results": [
    {
      id: "a4d023cc-55ab-4d1f-8135-d55efe0bf2c0",
      created_at: "2023-11-24T21:59:27.000Z",
      updated_at: "2025-06-20T01:20:08.000Z",
      name: "Kristine Brakus",
      avatar: "https://avatars.githubusercontent.com/u/61453415",
      text: "Capillus commemoro crux."
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
fetch('{{baseUrl}}/api/v1/testimonials?limit=3')
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Response]
{
  "results": [
    {
      id: "a4d023cc-55ab-4d1f-8135-d55efe0bf2c0",
      created_at: "2023-11-24T21:59:27.000Z",
      updated_at: "2025-06-20T01:20:08.000Z",
      name: "Kristine Brakus",
      avatar: "https://avatars.githubusercontent.com/u/61453415",
      text: "Capillus commemoro crux."
    },
    {
      id: "0d98a8bd-14a3-4d46-bc04-5823b65c7166",
      created_at: "2024-08-15T04:44:56.000Z",
      updated_at: "2025-02-07T04:29:11.000Z",
      name: "Priscilla Mills",
      avatar: "https://avatars.githubusercontent.com/u/98387195",
      text: "Contabesco quis socius."
    },
    {
      id: "6a725c6c-87c0-4624-b9cf-6c2197e429d4",
      created_at: "2023-11-07T01:27:49.000Z",
      updated_at: "2025-01-26T05:52:53.000Z",
      name: "Kim Parker",
      avatar: "https://avatars.githubusercontent.com/u/89489806",
      text: "Aureus conqueror vinculum colligo accusantium veniam charisma claudeo sui dedecor."
    }
  ]
}
```

:::
