import { Router, response } from "express";
import UserController from "./controllers/userController";
import { request } from "http";
import FriendController from "./controllers/friendController";
import ChatController from "./controllers/chatController";
import MessageController from "./controllers/messageController";
import FriendRequestController from "./controllers/friendRequestController";

const routes = Router()

routes.get('/getUser', UserController.getUser)
routes.get('/getFriendRequests', FriendRequestController.getFriendRequests)
routes.get('/getSingleFriend', FriendController.getSingleFriend)
routes.get('/getFriends', FriendController.getFriends)
routes.get('/getChats', ChatController.getUserChats)
routes.get('/getSingleChat', ChatController.getUserSingleChat)
routes.get('/getChatMessages', MessageController.getMessages)

routes.post('/loginUser', UserController.loginUser)
routes.post('/createUser', UserController.createUser)
routes.post('/sendFriendRequest', FriendRequestController.sendFriendRequest)
routes.post('/addFriend', FriendController.addFriend)
routes.post('/createNewChat', ChatController.createNewChat)
routes.post('/sendMessage', MessageController.sendMessage)

routes.put('/friendRequestResponse', FriendRequestController.handleFriendRequestResponse)

routes.delete('/removeUser', UserController.removeUser)
routes.delete('/removeFriend', FriendController.removeFriend)
routes.delete('/removeChat', ChatController.removeChat)
routes.delete('/removeMessage', MessageController.removeMessage)



export default routes