import { Response, Request } from "express";
import User from "../models/UserModel";


class UserController{
  public async createUser (req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["Usuário não recebido"]})
      const user = new User( req.body )
      await user.createUser()

      if(user.errors.length > 0) return res.status(503).send({errors: [...user.errors]})

      res.status(202).send({response: user.response})
    } 
    
    catch (error) {
      console.log(error)
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }

  public async getUser (req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["Usuário não recebido"]})
      const user = new User( req.body )
      await user.getUser()

      if(user.errors.length > 0) return res.status(503).send({errors: [...user.errors]})

      res.status(202).send({response: user.response})
    } 
  
    catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
  public async loginUser(req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["Usuário não recebido"]})
      const user = new User( req.body )
      await user.loginUser()

      if(user.errors.length > 0) return res.status(503).send({errors: [...user.errors]})

      res.status(202).send({response: user.response})
    } 
  
    catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
  public async removeUser(req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["Usuário não recebido"]})
      const user = new User( req.body )
      await user.removeUser()
      if(user.errors.length > 0) return res.status(503).send({errors: [...user.errors]})

      res.status(202).send({response: user.response})
    } 
    
    catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
}

export default new UserController()