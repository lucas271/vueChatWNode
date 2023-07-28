import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
dotenv.config()

const app = express()

app.use(cors({
  credentials: true
})) 

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(routes)

const PORT = process.env.PORT
console.log(PORT)

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
export default app