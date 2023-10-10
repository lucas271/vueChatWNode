import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useUserStore } from "./userStore"

export const useFriendRequestStore =  defineStore('userRequest', () => {
    const requestResponse = ref<string>()
    const friendRequestId = ref<string>()
    const friendRequests = ref<string[]>([])
    const errors = ref<string[]>([])

    async function sendRequest(receiverId: string, senderId: string, page:number){
        const sendRequest = await axios.post('http://localhost:3001/sendFriendRequest', {senderId, receiverId}).then(res => res.data.response).catch(async res => {
            await user.getUsers(page)
            res.response.data
        })
        const user = useUserStore()
        await user.getUsers(page)

        friendRequestId.value = sendRequest
    }

    async function getRequests(receiverId: string){
        const requests = await axios.get('http://localhost:3001/getFriendRequests'+`?receiverId=${receiverId}`).then(res => res.data.response).catch(async res => {
            console.log(res.response.data)
            return res.response.data
        })
        if(requests.errors) return 
        friendRequests.value = requests
    }

    async function friendRequestResponse(receiverId: string, senderId: string, isAccept: boolean, friendRequestId: any){
        const response = await axios.put('http://localhost:3001/friendRequestResponse', {receiverId, senderId, isAccept, friendRequestId}).then(res => res.data.response).catch(async res => {
            return res.response.data
        })

        if(response.errors.length > 0) return console.log(response.errors)
        console.log(response)
        await getRequests(receiverId)
    }
    return {sendRequest, getRequests, friendRequests, friendRequestResponse}
})