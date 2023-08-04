import app from "../app"

class FriendRequest{
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

  public async sendFriendRequest(){

  }

  public async getFriendRequests(){

  }
  public async handleRequestResponse(){

  }
}

export default FriendRequest