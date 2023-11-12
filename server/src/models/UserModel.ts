import app from "../app"
import validator from "validator"
import bcrypt from 'bcrypt'
import FriendRequest from './FriendRequestModel'
import Friendship from "./FriendshipModel"

interface UserBodyInterface{
  id?: string
  email: string,
  name: string,
  password: string,
  profilePic?: string
}

interface QueryInterface{
  limit: number,
  skip: number,
  user?: any
}

class User{
  public body: UserBodyInterface
  public errors: String[]
  public response: any
  public prisma: typeof app.prisma
  public query: QueryInterface
  
  constructor(body: UserBodyInterface, query?: QueryInterface){
    this.body = body
    this.errors = []
    this.response = null
    this.prisma = app.prisma
    this.query = query || {limit: 1, skip: 1, user: null}
  }

  public async createUser(){
    this.validateUser(true)
    if(this.errors.length > 0) return
    const user = await this.prisma.user.create({
      data:{
        email: this.body.email,
        name: this.body.name, 
        password: bcrypt.hashSync(this.body.password, 6),
        profilePic: this.body.profilePic ||''
      }
    }).catch((error) => {
      this.errors.push("Usuário já existe")
      return null
    })

    this.response = {email: user?.email, id: user?.id, name: user?.name, profilePic: user?.profilePic, createdAt: user?.createdAt, updatedAt: user?.updatedAt}
  }

  public async getUsers(){
    const friendRequest = await new FriendRequest({receiverId: this.query.user || ''})
    await friendRequest.getFriendRequests()
    const userFriendRequests: any[] = []
    friendRequest.response.map((res: any) => {
      return userFriendRequests.push(res.id)
    })
    await friendRequest.getSentFriendRequests()
    friendRequest.response.map((res: any) => {
      return userFriendRequests.push(res.receiverId)
    })

    const friendShip = await new Friendship({userId: this.query.user || ''})
    await friendShip.getFriendships()
  
    friendShip.response.map((res: any) => {
      return userFriendRequests.push(res.id)
    })
    
    const getUsersTemplate = {
      select: {
        id: true,
        name: true,
        profilePic: true,
        updatedAt: true,
        email:true
      },
      where: {
        NOT: {
          id: {in: [this.query.user || '', ...userFriendRequests]}
        }
      },
      take: this.query.limit,
      skip: this.query.skip,
    }

    this.response = {
      usersSelected: await this.prisma.user.findMany(getUsersTemplate).catch(err => {
        this.errors.push('Não encontramos nenhum Usuario')
        return []
      }), 

      usersCount: await this.prisma.user.count({where: {...getUsersTemplate.where}}).catch(err => {
        this.errors.push('Não foi possivel encontrar o total de usuários')
        return 0
      })
    }

  }

  public async getUser(){
    const user = await this.prisma.user.findUnique({where: {
      email: this.body.email,
      id: this.body.id
    }}).catch(() => {
      this.errors.push("Erro ao tentar encontrar usuário")
      return null
    })
    if(!user) {
      this.errors.push("Usuario não existe"); 
      return user
    }
    return user
  }
  public async loginUser(){
    if(!this.body.email && !this.body.id) return this.errors.push("dados do usuário não recebidos")
    this.validateUser()
    if(this.errors.length > 0) return
    const user = await this.getUser()
    if(this.errors.length > 0) return

    if(!(bcrypt.compareSync(this.body.password, String(user?.password)))) this.errors.push("Credenciais incorretas")
    this.response = {email: user?.email, id: user?.id, name: user?.name, profilePic: user?.profilePic, createdAt: user?.createdAt, updatedAt: user?.updatedAt}
  }
  public async removeUser(){
    if(!this.body.id) return this.errors.push("ID do usuário não recebido")

    const user = await this.prisma.user.delete({where: {
      id: this.body.id,
    }}).catch(() => {
      this.errors.push("id de usuário não encontrado")
      return null
    })

    if(this.errors.length > 0) return

    this.response = {email: user?.email, id: user?.id, name: user?.name, profilePic: user?.profilePic, createdAt: user?.createdAt, updatedAt: user?.updatedAt}
  }

  //validate body that represents user
  private async validateUser(needsName: boolean = false){
    try {
      if(
        !this.body.email ||
        !this.body.password
      ) return this.errors.push("campos vazios")

      //validate Name
      if(needsName && !this.body.name) this.errors.push("campos vazios")
      if(needsName && this.body.name.length > 40) return this.errors.push("nome n pode conter mais de 40 caracteres")
      if(needsName && /![^a-zA-Z ]/g.test(this.body.name)) return this.errors.push("Nome não pode conter números e caractéres especiais")

      //validateEmail
      if(!validator.isEmail(this.body.email)) return this.errors.push("Email Invalido")

      //validate Password
      if(this.body.password.length < 6) return this.errors.push("senha deve conter no minimo 6 caracteres")
      if(this.body.password.length > 30) return this.errors.push("senha não pode conter mais de 30 digitos")
      
      const UppercaseInPassword:number = this.body.password.match(/[A-Z]/g)?.length || 0
      const LowercaseInPassword:number = this.body.password.match(/[a-z]/g)?.length || 0
  
      if(UppercaseInPassword < 1) return this.errors.push("senha deve ter no minimo 1 letra maiúscula")
      if(LowercaseInPassword < 1) return this.errors.push("senha deve ter no minimo 1 letra minuscula")

    } catch (error) {
      this.errors.push("Algum dado invalido foi recebido")
    }
  }
}

export default User