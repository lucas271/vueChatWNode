import app from "../app"

class Chat{
  public body
  public errors: String[]
  public response: any
  public prisma: typeof app.prisma
  
  constructor(body: any){
    this.body = body
    this.errors = []
    this.response = null
    this.prisma = app.prisma
  }

  public async newChat(){
    if (!this.body.id && !this.body.friendId) return this.errors.push("info missing")

    const user = await this.prisma.chat.findFirst({
      where: {
        chatParticipants:{
          FriendId: this.body.userId,
          UserId: this.body.friendId
        }
      }
    }).catch(() => {
      this.errors.push('Erro ao tentar encontrar chat')
      return null
    })
    const friend = await this.prisma.chat.findFirst({
      where: {
        chatParticipants: {
          FriendId: this.body.friendId,
          UserId: this.body.userId        
        }
      }
    }).catch(() => {
      this.errors.push('Erro ao tentar encontrar chat')
      return null
    })

    if(!user && !friend) {
      const chat = await this.prisma.chat.create({data: {
        chatParticipants: {
          create: {
            UserId: this.body.userId,
            FriendId: this.body.friendId
          }
        }
      }}).catch((err) => console.log(err))

      return this.errors.length > 0 ? this.errors : this.response = chat
    }


  }

  public async getSingleChat(){
    if(!(this.body.userId && this.body.friendId)) return this.errors.push("informações faltando")
    const chat = await this.prisma.chat.findFirst({
      where: {
        OR: [
          {
            chatParticipants: {
              FriendId: this.body.friendId,
              UserId: this.body.userId
            }
          },
          {
            chatParticipants: {
              FriendId: this.body.userId,
              UserId: this.body.friendId
            }
          }
        ]
      }
    }).catch(() => this.errors.push("Nao foi possivel encontrar a conversa"))


    !chat && await this.newChat()
    if(this.errors.length > 0 ) return this.errors
    this.response = chat || this.response
  }
  public async removeChat(){
    if(!this.body.chatId) return this.errors.push("é preciso do id do chat para elimina-lo!!")

    const deletedChat = this.prisma.chat.delete({
      where: {
        id: this.body.chatId
      }
    }).catch(() => this.errors.push('nao foi possivel deletar o chat'))

    if (this.errors.length > 0) return
    this.response = deletedChat
  }
}

export default Chat