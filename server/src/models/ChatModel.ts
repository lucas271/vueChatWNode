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

  }

  public async getChats(){

  }
  public async getSingleChat(){

  }
  public async removeChat(){
    
  }
}

export default Chat