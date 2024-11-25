import cors from 'cors'
import express from 'express'
import handleError from './middlewares/handleError'
import router from './routes/routes'

const app = express()

app.use(
  cors({
    origin: ['http://localhost', 'http://localhost:5173'],
    credentials: true,
  })
)

app.use(express.json())

app.use(router)

app.use(handleError)

export default app
