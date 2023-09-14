# Pomodogo API by Mongo-Juice
Repository for the back-end of our Lap 3 project. Meant to be used in conjunction with our [front-end](https://github.com/RobbieStam/lap3-project-backend).

## Installation and Usage
- **Clone** this repository: `git clone <repo>`
- Move (`cd`) into **server** folder
- Install dependencies: `npm install`
- Create a NoSQL database instance (ideally on [MongoDB Atlas](https://www.mongodb.com/atlas))
- Create a **.env** file in the **server** folder and update the values below
```sh
# .env
PORT=port_number
DB_URL=your_database_url
```
- Seed the database: `npm setup-db`
- Run the app: `npm run dev`

## Available endpoints
Please note that all of the `/tasks` endpoints are unavailable without an authentication token (granted by logging in via the client).
| Route | Method | Response |
| --- | --- | --- |
| `/` | `GET` | Returns a JSON object describing the API. |
| `/tasks` | `GET` | Returns a JSON object containing all the tasks. |
| `/tasks` | `POST` | Accepts a JSON object and uses it to create and store a new task. |
| `/tasks/:id` | `GET` | Returns a JSON object representing a single task from the collection, selected by `:id`. |
| `/user/register` | `POST` | Accepts a JSON object and uses it to create and store a new user. |
| `/snacks/login` | `POST` | Logs a user in and creates a token for them. |