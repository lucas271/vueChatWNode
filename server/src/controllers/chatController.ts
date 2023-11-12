import { Request, Response } from "express";
import Chat from "../models/ChatModel";

class ChatController{
    public async getSingleChat(req: Request, res: Response){
        try {
            if(!req.query) return res.status(404).send({errors: ["Informações do usuário nao recebidas"]})
            const chat = new Chat(req.query)
            await chat.getSingleChat()
            if(chat.errors.length > 0) return res.status(400).send({errors: chat.errors})
            res.status(202).send({response: chat.response})
        } catch (error) {
            res.status(500).send({errors: ['server error']})
        }

    }
    public createChat(){

    }
}

export default new ChatController()