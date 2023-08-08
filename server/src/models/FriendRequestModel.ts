import app from "../app"

interface bodyInterface{
  receiverId: string,
  senderId: string,
  requestResponse: boolean
  friendRequestId: number
}

class FriendRequest{
  public body: bodyInterface
  public errors: String[]
  public response: any
  public prisma: typeof app.prisma
  
  constructor(body: bodyInterface){
    this.body = body
    this.errors = []
    this.response = null
    this.prisma = app.prisma
  }

  public async sendFriendRequest(){
    if(!this.body.senderId || !this.body.receiverId) return this.errors.push("Informações não recebidas")

    this.response = await this.prisma.friendRequest.create({
      data:{
        senderId: this.body.senderId,
        receiverId: this.body.receiverId
      }
    }).catch(() => {
      this.errors.push("solicitação de amizade já enviada")
      return null
    })
  }

  public async getFriendRequests(){
    if(!this.body.receiverId) return this.errors.push("ID do usuario não recebida")
    this.response = await this.prisma.friendRequest.findMany({where: {
      receiverId: this.body.receiverId
    }}).catch(() => this.errors.push("erro ao tentar encontrar solicitação de amizade"))
    if(this.errors.length > 0) return
    if(!this.response) return this.errors.push("Usuario não existe")
  }

  public async handleRequestResponse(){
    if(!this.body.receiverId ||
       !this.body.senderId ||
       !this.body.requestResponse) return this.errors.push("Alguma informação está faltando") 
    if(this.body.requestResponse) {
      await this.prisma.friendship.create({
        data:{
          user_id: this.body.senderId,
          friend_id: this.body.receiverId
        }
      }).catch(() => this.errors.push("solicitação de amizade não encontrada"))
    }
    if(this.errors.length > 0) return
    return this.response = await this.removeFriendRequest()
  }

  private async removeFriendRequest(){
    return this.prisma.friendRequest.delete({
      where: {
        id: this.body.friendRequestId 
      }
    }).catch(() => this.errors.push("Erro ao remover solicitação de amizade"))
  }
}

export default FriendRequest