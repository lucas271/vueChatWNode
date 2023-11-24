import { Request, Response } from "express";
import Message from "../models/MessageModel";
import app from "../app";

class MessageController{
  public async sendMessage(req: Request, res: Response){
    try {
      const message = new Message(req.body)
      await message.sendMessage()

      if(message.errors.length > 0) return res.status(400).send({errors: message.errors})

      app.io.emit("message", message.response)

      res.status(200).send({response: message.response})
    } 
    
    catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }

  public async getMessages(req: Request, res: Response){
    try {
      if(!req.query) return res.status(400).send({errors: ['não recebi o bglh']})
      const message = new Message(req.body, {id: String(req.query.id)})

      await message.getMessages()

      if(message.errors.length > 0) return res.status(400).send({errors: message.errors})
      res.status(200).send({response: message.response})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
}

export default new MessageController()