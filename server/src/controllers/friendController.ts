import { Response, Request } from "express";
import Friend from "../models/FriendModel";

class FriendController{
  public async getFriends (req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["dados do amigo não recebido"]})
      const friends = new Friend( req.body )
      await friends.getFriends()

      if(friends.errors.length > 0) return res.status(503).send({errors: [...friends.errors]})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }

  public async addFriend (req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["dados do amigo não recebido"]})
      const friends = new Friend( req.body )
      await friends.addFriend()

      if(friends.errors.length > 0) return res.status(503).send({errors: [...friends.errors]})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
  public async getSingleFriend (req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["dados do amigo não recebido"]})
      const friends = new Friend( req.body )
      await friends.getSingleFriend()

      if(friends.errors.length > 0) return res.status(503).send({errors: [...friends.errors]})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
  public async removeFriend (req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["dados do amigo não recebido"]})
      const friends = new Friend( req.body )
      await friends.removeFriend()

      if(friends.errors.length > 0) return res.status(503).send({errors: [...friends.errors]})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
}

export default new FriendController()