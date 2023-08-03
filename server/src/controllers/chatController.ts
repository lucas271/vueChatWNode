import { Response, Request } from "express";
import Chat from "../models/ChatModel";

class ChatController{
  public async createNewChat (req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["dados do chat não recebido"]})
      const chat = new Chat( req.body )
      await chat.newChat()

      if(chat.errors.length > 0) return res.status(503).send({errors: [...chat.errors]})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }

  public async getUserChats (req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["dados do chat não recebido"]})
      const chat = new Chat( req.body )
      await chat.getChats()

      if(chat.errors.length > 0) return res.status(503).send({errors: [...chat.errors]})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
  public async getUserSingleChat(req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["dados do chat não recebido"]})
      const chat = new Chat( req.body )
      await chat.getSingleChat()

      if(chat.errors.length > 0) return res.status(503).send({errors: [...chat.errors]})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
  public async removeChat(req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["dados do chat não recebido"]})
      const chat = new Chat( req.body )
      await chat.removeChat()

      if(chat.errors.length > 0) return res.status(503).send({errors: [...chat.errors]})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
}

export default new ChatController()