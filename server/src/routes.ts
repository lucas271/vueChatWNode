import { Router } from "express";
import UserController from "./controllers/userController";
import FriendController from "./controllers/friendController";
import FriendRequestController from "./controllers/friendRequestController";

const routes = Router()

routes.get('/getUser', UserController.getUser)
routes.get('/getFriendRequests', FriendRequestController.getFriendRequests)
routes.get('/getSingleFriendship', FriendController.getSingleFriend)
routes.get('/getFriendships', FriendController.getFriends)

routes.post('/loginUser', UserController.loginUser)
routes.post('/createUser', UserController.createUser)
routes.post('/sendFriendRequest', FriendRequestController.sendFriendRequest)
routes.post('/addFriendship', FriendController.addFriend)

routes.put('/friendRequestResponse', FriendRequestController.handleFriendRequestResponse)

routes.delete('/removeUser', UserController.removeUser)
routes.delete('/removeFriendship', FriendController.removeFriend)


export default routes