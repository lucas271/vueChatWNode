import app from "../app"


interface bodyInterface{
  userId: string,
  friendId?: string,
  friendshipId?: string
}
class Friendship{
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

  public async getFriendships(){
    if(!this.body.userId) return this.errors.push("Id do usuário não recebido")
    let friendShipIds = await this.prisma.friendship.findMany({
      where: {
        OR: [
          {
            friend_id: this.body.userId
          },
          {
            user_id: this.body.userId
          }        
        ],
      },
    }).catch(() => {
      this.errors.push("problema tentando achar amigos do usuario")
      return []
    }).then(resp => {
      return resp.map((user: any) => {
        return user.user_id !== this.body.userId ? user.user_id : user.friend_id 
      })
    })

    if(this.errors.length > 0) return

    //Get user ids user info
    const friendsInfo = await this.prisma.user.findMany({
      where: {
        id: {
          in: friendShipIds
        }
      },
      select:{
        id: true,
        email: true,
        profilePic: true,
        name: true,
      }
    }).catch(() => {
      this.errors.push("problema ao tentar coletar informações do amigos")
      return []
    })

    if(this.errors.length > 0) return
    if(friendsInfo.length < 1) return this.errors.push("Você não tem amigos")

    this.response = friendsInfo
  }

  public async addFriendship(){
    if(!this.body.friendId || !this.body.userId) this.errors.push("informações dos usuários não recebidas")
    
    this.response = this.prisma.friendship.create({
      data: {
        friend_id: this.body.friendId || '',
        user_id: this.body.userId
      }
    }).catch(() => {
      this.errors.push("Erro ao gerar amizade")
    })
  }
  public async getSingleFriendship(){
    if(!this.body.friendshipId) return this.errors.push('friendship id não foi recebido.')

    const friendShip = await this.friendshipExists()

    if(this.errors.length > 0) return
    if(!friendShip) return this.errors.push('amizade não existe.')

    this.response = friendShip
  }
  public async removeFriendship(){
    if(!this.body.friendshipId) return this.errors.push("id da amizade não recebido")

    if(!this.body.friendshipId) return this.errors.push('friendship id não foi recebido.')

    const friendshipExists = await this.friendshipExists()
    if(this.errors.length > 0) return
    if(!friendshipExists) return this.errors.push('amizade não existe.')

    this.prisma.friendship.delete({where: {
      id: this.body.friendshipId
    }}).catch(() => {
      this.errors.push("não foi possivel deletar a amizade")
    })

    if(this.errors.length > 0) return

    this.response = friendshipExists
  }

  private async friendshipExists(){
    return await this.prisma.friendship.findFirst({where: {
      id: this.body.friendshipId
    }}).catch(() => this.errors.push("erro ao procurar amizade"))
  }
}

export default Friendship