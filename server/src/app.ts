import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import routes from './routes'
dotenv.config()

class App{
  public express: express.Application
  
  public constructor(){
    this.express = express()


    this.middlewares()
    this.routes()
  }

  private async middlewares(){
    this.express.use(cors({
      credentials: true
    }))

    this.express.use(express.urlencoded({extended: true}))
    this.express.use(express.json())
  }

  private routes():void{
    this.express.use(routes)
  }
}


const app = new App()
export default app.express