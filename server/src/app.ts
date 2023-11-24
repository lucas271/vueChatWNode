import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
import { PrismaClient } from '@prisma/client'
import { Server } from 'http'
import { createServer } from 'http'
import Message from './controllers/messageController'
import {Server as IOServer} from 'socket.io'
dotenv.config()

class App {
  public express: express.Application
  public prisma: PrismaClient
  public server: Server
  public io: IOServer


  constructor(){
    this.express = express()

    this.middlewares()
    this.routes()

    this.prisma = new PrismaClient()
    this.server = createServer(this.express)
    this.io = new IOServer(this.server, {cors: {origin: "http://localhost:3000"}})
    this.io.on("connection", (user) => {
        user.on("userCredentials", (userId) => {
          user.on('userTyping', (chatInfo) => {
            console.log(chatInfo, userId)
            user.broadcast.emit('isFriendTyping', {chatId: chatInfo.chatId, friendId: chatInfo.friendId, isTyping: true})
          })
          user.on('stopedTyping', (value) => user.broadcast.emit('stopedTyping', {id: value.friendId}))
      })
    })

    this.server.listen(process.env.PORT, () => console.log(process.env.PORT))
  }

  private middlewares(){
    this.express.use(cors({
      credentials: true,
      origin: ["http://localhost:3000", "https://vue-chat-w-node-git-main-chatapps-projects.vercel.app", "https://vue-chat-w-node-qan42btev-chatapps-projects.vercel.app/",
       "vue-chat-w-node.vercel.app", "vue-chat-w-node-q0vnsguuy-chatapps-projects.vercel.app", "https://vue-chat-w-node.vercel.app"]
       
    })) 
    
    this.express.use(express.urlencoded({extended: true}))
    this.express.use(express.json())
  }

  private routes(){
    this.express.use(routes)
  }
}

export default new App()