import 'dotenv/config'
import express from 'express'
// import { PostgresHelper } from './src/db/postgres/helper.js'

const app = express()

app.use(express.json())

// app.get('/', async (req, res) => {
//   const results = await PostgresHelper.query('SELECT * FROM users')
//   res.send(results)
// })

// app.post('/', async (req, res) => {
//   res.send('Create user')
// })

app.listen(process.env.PORT, () => {
  console.log('listening port on 8080')
})
