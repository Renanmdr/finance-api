import 'dotenv/config'
import express from 'express'
import { CreateUserController } from './src/controllers/create-user.js'
import { GetUserByIdController } from './src/controllers/get-user-by-id.js'
import { UpdateUserController } from './src/controllers/update-user.js'
import { DeleteUserController } from './src/controllers/delete-user.js'
// import { PostgresHelper } from './src/db/postgres/helper.js'

const app = express()

app.use(express.json())

app.get('/api/users/:userId', async (req, res) => {
  const getUserByIdController = new GetUserByIdController()
  const { statusCode, body } = await getUserByIdController.execute(req)

  res.status(statusCode).json(body)
})

app.post('/api/users', async (req, res) => {
  const createUserController = new CreateUserController()
  const { statusCode, body } = await createUserController.execute(req)

  res.status(statusCode).json(body)
})

app.patch('/api/users/:userId', async (request, response) => {
  const updateUserController = new UpdateUserController()

  const { statusCode, body } = await updateUserController.execute(request)

  response.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (request, response) => {
  const deleteUserController = new DeleteUserController()

  const { statusCode, body } = await deleteUserController.execute(request)

  response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => {
  console.log(`listening port on 8080 ${process.env.PORT}`)
})
