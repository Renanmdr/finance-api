import 'dotenv/config'
import express from 'express'
import { CreateUserController } from './src/controllers/create-user.js'
// import { PostgresHelper } from './src/db/postgres/helper.js'

const app = express()

app.use(express.json())

app.post('/api/users', async (req, res) => {
  const createUserController = new CreateUserController()
  const { statusCode, body } = await createUserController.execute(req)

  res.status(statusCode).json(body)
})

app.listen(process.env.PORT, () => {
  console.log(`listening port on 8080 ${process.env.PORT}`)
})
