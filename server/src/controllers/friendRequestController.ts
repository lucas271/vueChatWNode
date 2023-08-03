import { Response, Request } from "express";
import FriendRequest from "../models/FriendRequestModel";


class FriendRequestController{
  public async sendFriendRequest (req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["solicitação de amizade não recebida"]})
      const friendRequest = new FriendRequest( req.body )
      await friendRequest.sendFriendRequest()

      if(friendRequest.errors.length > 0) return res.status(503).send({errors: [...friendRequest.errors]})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }

  public async getFriendRequests (req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["solicitação de amizade não recebida"]})
      const friendRequest = new FriendRequest( req.body )
      await friendRequest.getFriendRequests()

      if(friendRequest.errors.length > 0) return res.status(503).send({errors: [...friendRequest.errors]})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
  public async handleFriendRequestResponse(req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["solicitação de amizade não recebida"]})
      const friendRequest = new FriendRequest( req.body )
      await friendRequest.handleRequestResponse()

      if(friendRequest.errors.length > 0) return res.status(503).send({errors: [...friendRequest.errors]})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
}

export default new FriendRequestController()