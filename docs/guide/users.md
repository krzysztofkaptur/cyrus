---
outline: deep
---

<script setup lang="ts">
  const baseUrl = import.meta.env.VITE_BASE_URL
</script>

# Users

## Get all users

::: code-group

```js-vue [Request]
fetch('{{baseUrl}}/api/v1/users')
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Response]
{
  "prev": null,
  "next": "/api/v1/users?page=2&per_page=10",
  "total": 10,
  "results": [
    {
      "id": "bd127c0b-19c1-4b38-bf7c-68cf65fb1031",
      "created_at": "2023-12-23T03:25:35.000Z",
      "updated_at": "2025-05-08T14:45:58.000Z",
      "name": "Shawna Farrell",
      "email": "Bianka.Frami-Thiel47@gmail.com",
      "password": "BGUexnA",
      "phone": "+13645833161",
      "city": "Halvorsoncester",
      "street": "The Green",
      "number": "6463",
      "zipcode": "44814",
      "avatar": "https://avatars.githubusercontent.com/u/5834037",
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
fetch('{{baseUrl}}/api/v1/users?limit=3')
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Response]
{
  "prev": null,
  "next": "/api/v1/users?page=2",
  "total": 20,
  "results": [
    {
      "id": "bd127c0b-19c1-4b38-bf7c-68cf65fb1031",
      "created_at": "2023-12-23T03:25:35.000Z",
      "updated_at": "2025-05-08T14:45:58.000Z",
      "name": "Shawna Farrell",
      "email": "Bianka.Frami-Thiel47@gmail.com",
      "password": "BGUexnA",
      "phone": "+13645833161",
      "city": "Halvorsoncester",
      "street": "The Green",
      "number": "6463",
      "zipcode": "44814",
      "avatar": "https://avatars.githubusercontent.com/u/5834037",
    },
    {
      "id": "ca8147fa-5c32-4402-8406-3c64aa9a6b48",
      "created_at": "2024-04-18T00:56:41.000Z",
      "updated_at": "2025-05-24T19:47:03.000Z",
      "name": "Rosemarie Haag",
      "email": "Rory_Kuvalis@yahoo.com",
      "password": "EDbbDToGT",
      "phone": "+13559790109",
      "city": "West Amir",
      "street": "N Oak Street",
      "number": "2394",
      "zipcode": "05560",
      "avatar": "https://avatars.githubusercontent.com/u/5834037",
    },
    {
      "id": "a80913df-ef86-4127-a932-a455785bdd67",
      "created_at": "2024-01-01T07:46:10.000Z",
      "updated_at": "2025-08-05T22:10:45.000Z",
      "name": "Edward Mante",
      "email": "Ayla.Langosh45@yahoo.com",
      "password": "nVPsLFi",
      "phone": "+13554935885",
      "city": "New Boyd",
      "street": "Virginie Place",
      "number": "288",
      "zipcode": "06624",
      "avatar": "https://avatars.githubusercontent.com/u/5834037",
    }
  ]
}
```

:::

### Order

Sorts the returned results by specified property.
Properties: `name`, `email`, `created_at`, `city`, `street`, `zipcode`,

::: code-group

```js-vue [Request (ascending)]
fetch('{{baseUrl}}/api/v1/users?order=name')
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Request (descending)]
fetch('{{baseUrl}}/api/v1/users?order=-name')
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
      "id": "155e6197-b6f8-4464-a12d-e0824c92fad6",
      "created_at": "2024-09-03T22:16:42.000Z",
      "updated_at": "2024-11-22T07:50:54.000Z",
      "name": "Alma Wolf-Friesen",
      "email": "Demarco_Rippin@gmail.com",
      "password": "mjgsOlThpr",
      "phone": "+13827368670",
      "city": "Karsonstad",
      "street": "Hansen Corner",
      "number": "14276",
      "zipcode": "74323",
      "avatar": "https://avatars.githubusercontent.com/u/5834037",
    },
    {
      "id": "7481f661-73ba-4434-b870-f9b33634ca9f",
      "created_at": "2023-10-03T10:24:33.000Z",
      "updated_at": "2025-08-27T19:20:00.000Z",
      "name": "Beatrice Weimann",
      "email": "Magdalena_Bogisich23@yahoo.com",
      "password": "bauWIk",
      "phone": "+18552843218",
      "city": "Westshire",
      "street": "W 8th Street",
      "number": "39917",
      "zipcode": "76063-8297",
      "avatar": "https://avatars.githubusercontent.com/u/5834037",
    },
    {
      "id": "4d5a0bdc-01e5-4116-8d35-d8b4af618d7b",
      "created_at": "2023-11-14T12:55:37.000Z",
      "updated_at": "2024-12-30T00:34:53.000Z",
      "name": "Clarence Kuhlman",
      "email": "Edythe70@yahoo.com",
      "password": "OEdOHEkb",
      "phone": "+12918499828",
      "city": "Aftonstead",
      "street": "Main Street S",
      "number": "3759",
      "zipcode": "99710-0059",
      "avatar": "https://avatars.githubusercontent.com/u/5834037",
    },
    ...
  ]
}
```

:::

### Pagination

Returns specified page with determined results count per page (default `per_page=10`)

::: code-group

```js-vue [Request]
fetch('{{baseUrl}}/api/v1/users?per_page=3&page=2')
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Response]
{
  "prev": "/api/v1/users?page=1",
  "next": "/api/v1/users?page=3",
  "total": 20,
  "results": [
    {
      "id": "7481f661-73ba-4434-b870-f9b33634ca9f",
      "created_at": "2023-10-03T10:24:33.000Z",
      "updated_at": "2025-08-27T19:20:00.000Z",
      "name": "Beatrice Weimann",
      "email": "Magdalena_Bogisich23@yahoo.com",
      "password": "bauWIk",
      "phone": "+18552843218",
      "city": "Westshire",
      "street": "W 8th Street",
      "number": "39917",
      "zipcode": "76063-8297",
      "avatar": "https://avatars.githubusercontent.com/u/5834037",
    },
    {
      "id": "b33fef60-b114-49f2-8914-ee9f14fc9150",
      "created_at": "2023-10-15T01:05:13.000Z",
      "updated_at": "2025-05-07T21:05:47.000Z",
      "name": "Gary Murphy",
      "email": "Annabel77@hotmail.com",
      "password": "KqUJAReAFT",
      "phone": "+12579711250",
      "city": "New Morris",
      "street": "Hill Street",
      "number": "4169",
      "zipcode": "78359",
      "avatar": "https://avatars.githubusercontent.com/u/5834037",
    },
    {
      "id": "675e5b55-256d-461f-b19d-05a307d62ec6",
      "created_at": "2024-08-23T01:51:49.000Z",
      "updated_at": "2025-07-26T22:55:25.000Z",
      "name": "Mr. Clifton Herzog",
      "email": "Maida_Schmeler56@yahoo.com",
      "password": "nHvsbuD",
      "phone": "+15597651779",
      "city": "Samantaboro",
      "street": "Garrett Lights",
      "number": "91619",
      "zipcode": "07313-7295",
      "avatar": "https://avatars.githubusercontent.com/u/5834037",
    }
  ]
}
```

:::

## Get a single user

::: code-group

```js-vue [Request]
fetch('{{baseUrl}}/api/v1/users/1')
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Response]
 {
  "id": "bd127c0b-19c1-4b38-bf7c-68cf65fb1031",
  "created_at": "2023-12-23T03:25:35.000Z",
  "updated_at": "2025-05-08T14:45:58.000Z",
  "name": "Shawna Farrell",
  "email": "Bianka.Frami-Thiel47@gmail.com",
  "password": "BGUexnA",
  "phone": "+13645833161",
  "city": "Halvorsoncester",
  "street": "The Green",
  "number": "6463",
  "zipcode": "44814",
  "avatar": "https://avatars.githubusercontent.com/u/5834037",
}
```

:::

## Add a user

::: code-group

```js-vue [Request]
fetch('{{baseUrl}}/api/v1/users', {
  method: "POST",
  body: JSON.stringify({
    email: "Bianka.Frami-Thiel47@gmail.com",
    password: "BGUexnA"
  })
})
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Response]
{
  "id": "bd127c0b-19c1-4b38-bf7c-68cf65fb1031",
  "created_at": "2023-12-23T03:25:35.000Z",
  "updated_at": "2025-05-08T14:45:58.000Z",
  "name": null,
  "email": "Bianka.Frami-Thiel47@gmail.com",
  "password": "BGUexnA",
  "phone": null,
  "city": null,
  "street": null,
  "number": null,
  "zipcode": null,
  "avatar": "https://avatars.githubusercontent.com/u/5834037",
}
```

:::

## Update a user

::: code-group

```js-vue [Request]
fetch('{{baseUrl}}/api/v1/users/1', {
  method: "PATCH",
  body: JSON.stringify({
    name: "test edited",
  })
})
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Response]
{
  "id": "bd127c0b-19c1-4b38-bf7c-68cf65fb1031",
  "created_at": "2023-12-23T03:25:35.000Z",
  "updated_at": "2025-05-08T14:45:58.000Z",
  "name": "test edited",
  "email": "Bianka.Frami-Thiel47@gmail.com",
  "password": "BGUexnA",
  "phone": null,
  "city": null,
  "street": null,
  "number": null,
  "zipcode": null,
  "avatar": "https://avatars.githubusercontent.com/u/5834037",
}
```

:::

## Delete a user

::: code-group

```js-vue [Request]
fetch('{{baseUrl}}/api/v1/users/bd127c0b-19c1-4b38-bf7c-68cf65fb1031', {
  method: "DELETE"
})
  .then(res=>res.json())
  .then(json=>console.log(json))
```

```js-vue [Response]
{
  "id": "bd127c0b-19c1-4b38-bf7c-68cf65fb1031",
  "created_at": "2023-12-23T03:25:35.000Z",
  "updated_at": "2025-05-08T14:45:58.000Z",
  "name": "test edited",
  "email": "Bianka.Frami-Thiel47@gmail.com",
  "password": "BGUexnA",
  "phone": "+13645833161",
  "city": "Halvorsoncester",
  "street": "The Green",
  "number": "6463",
  "zipcode": "44814",
  "avatar": "https://avatars.githubusercontent.com/u/5834037",
}
```

:::
