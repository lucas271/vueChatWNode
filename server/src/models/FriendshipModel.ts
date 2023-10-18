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
    this.response = []

    let friendShipRelations = await this.prisma.friendship.findMany({where: {
      friend_id: this.body.userId
      }}).catch(() => {
        this.errors.push("problema tentando achar amigos do usuario")
        return []
      })
      if(this.errors.length > 0) return []
      friendShipRelations = [...friendShipRelations, ...await this.prisma.friendship.findMany({where: {
        user_id: this.body.userId
      }}).catch(() => {
        this.errors.push("problema tentando achar amigos do usuario")
        return []
      })]
      const friendsId = friendShipRelations.map((user: any) => {
        return user.user_id !== this.body.userId ? user.user_id : user.friend_id 
      })
      if(this.errors.length > 0) return
      const friendsInfo = await this.prisma.user.findMany({
        where: {
          id: {
            in: friendsId
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
    if(!this.body.friendshipId)
    this.response = await this.prisma.friendship.findFirst({where: {
      id: this.body.friendshipId
    }}).catch(() => this.errors.push("Amizade não existe"))
    if(this.errors.length > 0) return
    if(!this.response) this.errors.push("amizade não encontrada")
  }
  public async removeFriendship(){
    if(!this.body.friendshipId) return this.errors.push("id da amizade não recebido")

    this.response = this.prisma.friendship.delete({where: {
      id: this.body.friendshipId
    }}).catch(() => {
      this.errors.push("Amizade não encontrada")
    })
    if(this.errors.length > 0) return
    if(!this.response) this.errors.push("Amizade não encontrada")
  }
}

export default Friendship