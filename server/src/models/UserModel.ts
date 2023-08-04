import app from "../app"
import validator from "validator"
import bcrypt from 'bcrypt'

interface UserBodyInterface{
  id?: string
  email: string,
  name: string,
  password: string,
  profilePic?: string
}

class User{
  public body: UserBodyInterface
  public errors: String[]
  public response: any
  public prisma: typeof app.prisma
  
  constructor(body: any){
    this.body = body
    this.errors = []
    this.response = null
    this.prisma = app.prisma
  }

  public async createUser(){
    this.validateUser()
    if(this.errors.length > 0) return
    this.response = await this.prisma.user.create({
      data:{
        email: this.body.email,
        name: this.body.name,
        password: bcrypt.hashSync(this.body.password, 6),
        profilePic: this.body.profilePic ||''
      }
    }).catch(() => {
      this.errors.push("usuario já existe")
      return null
    })
  }

  public async getUser(){
    this.response = await this.prisma.user.findUnique({where: {
      email: this.body.email
    }})
    if(!this.response) return this.errors.push("Usuario não existe")
  }
  public async loginUser(){
    this.validateUser()
    this.getUser()
    if(this.errors.length > 0) return

    if(!(bcrypt.compareSync(this.body.password, this.response.password))) this.errors.push("passwords does not match")
  }
  public async removeUser(){
    if(!this.body.id) return this.errors.push("ID do usuário não recebido")

    return this.response = await this.prisma.user.delete({where: {
      id: this.body.id
    }}).catch(() => {
      this.errors.push("id de usuário não encontrado")
      return null
    })
  }

  //validate body that represents user
  private async validateUser(){
    if(
      validator.isEmpty(this.body.email),
      validator.isEmpty(this.body.name),
      validator.isEmpty(this.body.password)
    ) return this.errors.push("campos vazios")
    if(!validator.isEmail(this.body.email)) return this.errors.push("Email Invalido")
    if(this.body.password.length < 6) return this.errors.push("senha deve conter no minimo 6 caracteres")
    if(this.body.password.length > 30) return this.errors.push("senha não pode conter mais de 30 digitos")
    
    if(/[^a-zA-Z]/g.test(this.body.name)) return this.errors.push("Nome não pode conter números e caractéres especiais")
    if(this.body.name.length > 40) return this.errors.push("nome n pode conter mais de 40 caracteres")

    const UppercaseInPassword:number = this.body.password.match(/[A-Z]/g)?.length || 0
    const LowercaseInPassword:number = this.body.password.match(/[a-z]/g)?.length || 0

    if(UppercaseInPassword < 1) return this.errors.push("senha deve ter no minimo 1 letra maiúscula")
    if(LowercaseInPassword < 1) return this.errors.push("senha deve ter no minimo 1 letra minuscula")
  }
}

export default User