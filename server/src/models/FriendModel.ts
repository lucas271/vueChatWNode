import app from "../app"

class Friend{
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

  public async getFriends(){

  }

  public async addFriend(){

  }
  public async getSingleFriend(){

  }
  public async removeFriend(){
    
  }
}

export default Friend