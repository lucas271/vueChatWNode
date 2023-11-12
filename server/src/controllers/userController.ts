import { Response, Request } from "express";
import User from "../models/UserModel";


class UserController{


  public async createUser (req: Request, res: Response){
    try {
      if(!req.body || Object.keys(req.body).length < 1) return res.status(404).send({errors: ["Usuário não recebido"]})
      const user = new User( req.body )
      await user.createUser()

      if(user.errors.length > 0) return res.status(400).send({errors: [...user.errors]})

      res.status(202).send({response: user.response})
    } 
    
    catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }

  public async getUser (req: Request, res: Response){
    try {
      if(!req.body) return res.status(404).send({errors: ["Usuário não recebido"]})
      const user = new User( req.body )
      await user.getUser()
      if(user.errors.length > 0) return res.status(400).send({errors: [...user.errors]})
      res.status(202).send({response: user.response})
    } 
  
    catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }

  public async getUsers (req: Request, res: Response){
    try {
      const users = new User({email: '', name: '', password:''}, {limit: Number(req.query.limit) || 3, skip: Number(req.query.skip) ?? 0, user: req.query.user})
      await users.getUsers()
      return res.send({response: users.response})
    } catch (error) {
      return res.send({error: 'Erro ao tentar encontrar usuários'})
    }

  }

  public async loginUser(req: Request, res: Response){
    try {
      if(!req.body || Object.keys(req.body).length < 1) return res.status(404).send({errors: ["Usuário não recebido"]})
      const user = new User( req.body )
      await user.loginUser()

      if(user.errors.length > 0) return res.status(400).send({errors: [...user.errors]})

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
      if(user.errors.length > 0) return res.status(400).send({errors: [...user.errors]})

      res.status(202).send({response: user.response})
    } 
    
    catch (error) {
      res.status(501).send({ errors: ['Erro no servidor'] })   
    }
  }
}

export default new UserController()