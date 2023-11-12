import { Response, Request } from "express";
import FriendRequest from "../models/FriendRequestModel";
import app from "../app";


class FriendRequestController{
  public async sendFriendRequest (req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["solicitação de amizade não recebida"]})
      const friendRequest = new FriendRequest( req.body )
      await friendRequest.sendFriendRequest()

      if(friendRequest.errors.length > 0) return res.status(400).send({errors: [...friendRequest.errors]})


      app.io.emit("friendRequest", {receiverId: req.body.receiverId})
      res.status(202).send({response: friendRequest.response})

    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }

  public async getFriendRequests (req: Request, res: Response){
    try {
      if(!req.body && !req.query.receiverId) return res.status(404).send({errors: ["solicitação de amizade não recebida"]})
      const friendRequest = new FriendRequest( Object.keys(req.body).length > 0 ? req.body : {receiverId: req.query.receiverId})
      await friendRequest.getFriendRequests()

      if(friendRequest.errors.length > 0) return res.status(400).send({errors: [...friendRequest.errors]})
      res.status(202).send({response: friendRequest.response})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
  public async handleFriendRequestResponse(req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["solicitação de amizade não recebida"]})
      const friendRequest = new FriendRequest(req.body)
      await friendRequest.handleRequestResponse()

      if(friendRequest.errors.length > 0) return res.status(400).send({errors: [...friendRequest.errors]})

      //noFriendRequestResponse socket for now

      res.status(202).send({response: friendRequest.response})
    } catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
}

export default new FriendRequestController()