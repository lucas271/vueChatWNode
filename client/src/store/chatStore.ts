import { defineStore } from "pinia"
import { ref } from "vue"
import { useMessageStore } from "./messagesStore"
import axios from "axios"
import { useUserStore } from "./userStore"

export interface chatInterface{
    friendId: string,
    friendName: string,
    friendProfilePic: string,
    id: string,
    chatParticipantsId: string
}

export const useChatStore =  defineStore('chat', () => {
    const errors = ref<string[]>([])
    const selectedChat = ref<chatInterface | null>()
    const loading = ref<boolean | null>(null)

    async function getSingleChat ({friendName, friendProfilePic, friendId}: {friendName: string, friendProfilePic: string, friendId: string}){
        loading.value = true
        const userStore = useUserStore()
        const chat = await axios.get("api/getSingleChat?"+`friendId=${friendId}&userId=${userStore.user?.id}`).catch((err) => {
            loading.value = false
            err.response?.data?.errors && errors.value.push(err.response?.data?.errors)
            return err
        })
        if(errors.value.length > 0) return loading.value = false


        loading.value = false
        selectedChat.value = {...chat.data?.response, friendName, friendProfilePic, friendId}

        await useMessageStore().getMessages()
    }

    function reset(){
        loading.value = true
        selectedChat.value = null
        errors.value = []
    }

    return {selectedChat, getSingleChat, reset, loading}
})