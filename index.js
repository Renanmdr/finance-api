import express from 'express'
import 'dotenv/config'
import { PostgresHelper } from './src/db/postgres/helper.js'

const app = express()

app.get('/', async (req, res) => {
  const results = await PostgresHelper.query('SELECT * FROM users')
  res.send(results)
})

app.listen(3000, () => {
  console.log('listening port on 3000')
})
