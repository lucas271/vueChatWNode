import { Router } from "express";
import UserController from "./controllers/userController";
import FriendController from "./controllers/friendController";
import FriendRequestController from "./controllers/friendRequestController";
import userController from "./controllers/userController";
import chatController from "./controllers/chatController";
import MessageController from "./controllers/messageController";
import messageController from "./controllers/messageController";

const routes = Router()


routes.get('/test', (req, res) => {
    return res.send('ok')
})
routes.get('/getUser', UserController.getUser)
routes.get('/getUsers', userController.getUsers)
routes.get('/getFriendRequests', FriendRequestController.getFriendRequests)
routes.get('/getSingleFriendship', FriendController.getSingleFriend)
routes.get('/getFriendships', FriendController.getFriends)
routes.get('/getSingleChat', chatController.getSingleChat)
routes.get('/getMessages', messageController.getMessages)

routes.post('/loginUser', UserController.loginUser)
routes.post('/createUser', UserController.createUser)
routes.post('/sendFriendRequest', FriendRequestController.sendFriendRequest)
routes.post('/sendMessage', MessageController.sendMessage)
routes.post('/addFriendship', FriendController.addFriend)

routes.put('/friendRequestResponse', FriendRequestController.handleFriendRequestResponse)

routes.delete('/removeUser', UserController.removeUser)
routes.delete('/removeFriendship', FriendController.removeFriend)


export default routes