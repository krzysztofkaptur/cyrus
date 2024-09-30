# Getting started

This project can be used in 2 main ways.

## Basic

Use provided endpoints as is, by sending a request to e.g. `https://cyrus-api.com/api/v1/todos`. This approach is a bit limited as adding, updating, and deleting are not doing much more than just returning some JSON. Those endpoints don't hit a database so users won't override datasets for each other.

## Advanced

Clone the repository from GitHub and integrate it locally alongside your project. The code for adding, updating, and deleting data (connected to a database) has been provided within comments. Simply uncomment the relevant sections to take full control of your datasets.
