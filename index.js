import 'dotenv/config'
import express from 'express'

import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserByIdController,
  makeUpdateUserController,
} from './src/factories/controllers/user.js'
import { makeCreateTransactionController } from './src/factories/controllers/transaction.js'

const app = express()

app.use(express.json())

app.get('/api/users/:userId', async (req, res) => {
  const getUserByIdController = makeGetUserByIdController()
  const { statusCode, body } = await getUserByIdController.execute(req)

  res.status(statusCode).json(body)
})

app.post('/api/users', async (req, res) => {
  const createUserController = makeCreateUserController()
  const { statusCode, body } = await createUserController.execute(req)

  res.status(statusCode).json(body)
})

app.patch('/api/users/:userId', async (request, response) => {
  const updateUserController = makeUpdateUserController()

  const { statusCode, body } = await updateUserController.execute(request)

  response.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (request, response) => {
  const deleteUserController = makeDeleteUserController()

  const { statusCode, body } = await deleteUserController.execute(request)

  response.status(statusCode).send(body)
})

app.post('/api/transactions', async (request, response) => {
  const createTransactionController = makeCreateTransactionController()

  const { statusCode, body } =
    await createTransactionController.execute(request)

  response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => {
  console.log(`listening port on 8080 ${process.env.PORT}`)
})
