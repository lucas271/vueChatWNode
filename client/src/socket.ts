import {reactive} from 'vue'
import {io} from 'socket.io-client'
import { useChatStore } from './store/chatStore'
import { useMessageStore } from './store/messagesStore'
import { useUserStore } from './store/userStore'

export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: []
})

export default (function ioServer(){
    const socket = io("api")
    socket.on("connect", () => state.connected = true)

    socket.on("message", async (message) => {
        console.log(message.id, message, useUserStore().user?.id)

        if(useChatStore().selectedChat && message.receiverId === useUserStore().user?.id) await useMessageStore().getMessages()

    })

    return socket


})()
