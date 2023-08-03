import { Response, Request } from "express";
import Message from "../models/MessageModel";



class MessageController{
  public async sendMessage (req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["Mensagem não recebida"]})
      const message = new Message( req.body )
      await message.sendMessage()

      if(message.errors.length > 0) return res.status(503).send({errors: [...message.errors]})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }

  public async getMessages (req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["Mensagem não recebida"]})
      const message = new Message( req.body )
      await message.getMessages()

      if(message.errors.length > 0) return res.status(503).send({errors: [...message.errors]})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }

  public async removeMessage(req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["Mensagem não recebida"]})
      const message = new Message( req.body )
      await message.removeMessage()

      if(message.errors.length > 0) return res.status(503).send({errors: [...message.errors]})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
}

export default new MessageController()