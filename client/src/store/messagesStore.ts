import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useChatStore } from "./chatStore"
import { useUserStore } from "./userStore"

interface messageInterface{
    id: string,
    senderId: string,
    chatId: string,
    message: string,
    createdAt: Date,
    updatedAt: Date,
}

export const useMessageStore =  defineStore('message', () => {
    const messageInfo = ref<any>()
    const loading = ref<boolean>(true)
    const errors = ref<string[]>([])
    const messages = ref<messageInterface[]>([])

    async function getMessages() {
        const chatId = useChatStore().selectedChat?.id
        if (chatId === messages.value[0]?.chatId) reset()
        const senderId = useUserStore().user?.id

        if(!chatId) return errors.value.push('Nenhum chat selecionado')
        if(!senderId) return errors.value.push('Você não estã logado')

        const messagesResp = await axios.get("https://vuechatwnodeapi-1t2r.onrender.com/getMessages?"+`id=${chatId}`).catch((err) => {
            loading.value = false
            err.response?.data?.errors && errors.value.push(err.response?.data?.errors)
            return err
        })

        if(errors.value.length > 0) return  loading.value = false

        loading.value = false
        return messages.value = messagesResp.data.response
    }

    async function sendMessage(message: string){
        if(!message) return errors.value.push("Campo mensagem está vazio")

        const chatId = useChatStore().selectedChat?.id
        const senderId = useUserStore().user?.id
        if(!chatId) return errors.value.push('Nenhum chat selecionado')
        if(!senderId) return errors.value.push('Você não estã logado')

        const sentMessage = await axios.post("https://vuechatwnodeapi-1t2r.onrender.com/sendMessage", {chatId, message, senderId, receiverId: useChatStore().selectedChat?.friendId}).catch((err) => {
            err.response?.data?.errors && errors.value.push(err.response?.data?.errors)
            return err
        })

        if(errors.value.length > 0) return

        messageInfo.value = sentMessage
        messages.value.push(sentMessage.data.response)
    }

    function reset(){
        errors.value = []
        messages.value = []
        loading.value = true
    }

    return {getMessages, messages, sendMessage}
})