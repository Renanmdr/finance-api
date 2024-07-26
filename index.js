import 'dotenv/config'
import express from 'express'
import {
  CreateUserController,
  GetUserByIdController,
  UpdateUserController,
  DeleteUserController,
} from './src/controllers/index.js'
import {
  PostgresCreateUserRepository,
  PostgresDeleteUserByIdRepository,
  PostgresGetUserByEmailRepository,
  PostgresGetUserByIdRepository,
  PostgresUpdateUserRepository,
} from './src/repositories/postgres/index.js'
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from './src/use-cases/index.js'

const app = express()

app.use(express.json())

app.get('/api/users/:userId', async (req, res) => {
  const getUserByIdRepository = new PostgresGetUserByIdRepository()
  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)
  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)
  const { statusCode, body } = await getUserByIdController.execute(req)

  res.status(statusCode).json(body)
})

app.post('/api/users', async (req, res) => {
  const createUserRepository = new PostgresCreateUserRepository()
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    getUserByEmailRepository,
  )

  const createUserController = new CreateUserController(createUserUseCase)
  const { statusCode, body } = await createUserController.execute(req)

  res.status(statusCode).json(body)
})

app.patch('/api/users/:userId', async (request, response) => {
  const updateUserRepository = new PostgresUpdateUserRepository()
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
  const updateUserUseCase = new UpdateUserUseCase(
    updateUserRepository,
    getUserByEmailRepository,
  )
  const updateUserController = new UpdateUserController(updateUserUseCase)

  const { statusCode, body } = await updateUserController.execute(request)

  response.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (request, response) => {
  const deleteUserByIdRepository = new PostgresDeleteUserByIdRepository()
  const deleteUserUseCase = new DeleteUserUseCase(deleteUserByIdRepository)
  const deleteUserController = new DeleteUserController(deleteUserUseCase)

  const { statusCode, body } = await deleteUserController.execute(request)

  response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => {
  console.log(`listening port on 8080 ${process.env.PORT}`)
})
