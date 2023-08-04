import app from "../app"

class Message{
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

  public async sendMessage(){

  }

  public async getMessages(){

  }
  public async removeMessage(){
    
  }
}

export default Message