import { Response, Request } from "express";
import Friendship from "../models/FriendshipModel";

class FriendController{
  public async getFriends (req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["dados do amigo não recebido"]})
      const friendship = new Friendship( req.body )
      await friendship.getFriendships()

      if(friendship.errors.length > 0) return res.status(503).send({errors: [...friendship.errors]})
      res.status(202).send({response: friendship.response})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }

  public async addFriend (req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["dados do amigo não recebido"]})
      const friendship = new Friendship( req.body )
      await friendship.addFriendship()

      if(friendship.errors.length > 0) return res.status(503).send({errors: [...friendship.errors]})
      res.status(202).send({response: friendship.response})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
  public async getSingleFriend (req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["dados do amigo não recebido"]})
      const friendship = new Friendship( req.body )
      await friendship.getSingleFriendship()

      if(friendship.errors.length > 0) return res.status(503).send({errors: [...friendship.errors]})
      res.status(202).send({response: friendship.response})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
  public async removeFriend (req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["dados do amigo não recebido"]})
      const friendship = new Friendship( req.body )
      await friendship.removeFriendship()

      if(friendship.errors.length > 0) return res.status(503).send({errors: [...friendship.errors]})
      res.status(202).send({response: friendship.response})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
}

export default new FriendController()