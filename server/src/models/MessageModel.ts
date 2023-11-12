import app from "../app"


interface body{
  message: string,
  chatId: string,
  messageId: string,
  senderId: string,
  receiverId:string
}

interface queryInterface{
  id: string
}

class Message{
  public body: body
  public errors: String[]
  public response: any
  public prisma: typeof app.prisma
  public query: queryInterface | undefined
  
  constructor(body: body, query?: queryInterface){
    this.body = body
    this.errors = []
    this.response = null
    this.prisma = app.prisma
    this.query = query
  }

  public async sendMessage(){
    if(!this.body.chatId) return this.errors.push("ID do chat não recebido")
    if(!this.body.message) return this.errors.push("mensagem não recebida")


    const message = await this.prisma.message.create({
      data: {
        chatId: this.body.chatId,
        senderId: this.body.senderId,
        message: this.body.message,
        receiverId: this.body.receiverId
      }
    }).catch(() => this.errors.push("Erro no servidor"))
    if(this.errors.length > 0) return 
    
    this.response = message
  }

  public async getMessages(){
    if(!this.query?.id) return this.errors.push("ID do chat não recebido")
    this.response = await this.prisma.message.findMany({where: {
      chatId: this.query.id
    }, orderBy:{
      createdAt: 'asc'
    }}).catch(() => {
      this.errors.push("Erro ao encontrar mensagens")
      return []
    })
    if(this.errors.length > 0) return 

    if(this.response.length < 1) return this.errors.push("Nenhuma mensagem encontrada")
  }
  public async removeMessage(){
    if(!this.body.messageId) return this.errors.push("id da mensagem não recebido")
    
    this.response = this.prisma.message.delete({
      where: {
        id: this.body.messageId
      }
    }).catch(() => this.errors.push("erro ao deletar mensagem"))
  }

  public async updateMessage(){
    if(!this.body.messageId) this.errors.push("mensagem não recebida")
    if(!this.body.message) this.errors.push("Nova mensagem não recebida")

    this.response = this.prisma.message.update({
      data:{
        message: this.body.message
      },
      where: {
        id: this.body.messageId
      }
    }).catch(() => this.errors.push("Erro ao modificar mensagem"))
  }
}

export default Message