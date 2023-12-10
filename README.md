# TODO Task Manager for NodeJS

This project implements a simple REST API with basic CRUD
operations for a TODO list task manager in NodeJS.

Each task has an ID, name, title, description, creator,
assignee, and due date. REST API operations are accessed
with the task ID.

The API endpoints are the following:

| Methods     | Urls             |Description            |
| ----------- | -----------      | -----------        |
| GET         | api/tasks    |Get all tasks           |
| GET         | api/tasks/id |Get a specific task         |
| POST        | api/tasks    |Create a new task         |
| PUT        | api/tasks/id    |Update an existing task|
| DELETE        | api/tasks/id    |Delete an existing task|

## Getting Started

Clone the repo:

```bash
https://github.com/eddie-c-davis/node-todo.git
cd node-todo
```

Install the dependencies:

```bash
npm install
```
Run the server:

```bash
npm run dev
```