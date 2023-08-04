import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
import { PrismaClient } from '@prisma/client'
dotenv.config()

class App {
  public express: express.Application
  public prisma: PrismaClient

  public constructor(){
    this.express = express()
    this.prisma = new PrismaClient()

    this.middlewares()
    this.routes()

    this.express.listen(process.env.PORT, () => console.log("listening on port " + process.env.PORT))
  }

  private middlewares(){
    this.express.use(cors({
      credentials: true
    })) 
    
    this.express.use(express.urlencoded({extended: true}))
    this.express.use(express.json())
    
  }

  private routes(){
    this.express.use(routes)
  }
}

export default new App()