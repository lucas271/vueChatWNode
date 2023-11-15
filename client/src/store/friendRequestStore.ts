import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useUserStore } from "./userStore"

interface friendRequestInterface{
    friendRequestSent: {id:string}[]
    email: string,
    id: string,
    name: string,
    profilePic:string
}

export const useFriendRequestStore =  defineStore('userRequest', () => {
    const requestResponse = ref<boolean>()
    const friendRequestId = ref<string>()
    const friendRequests = ref<friendRequestInterface[]>([])
    const errors = ref<string[]>([])
    const loading = ref<boolean>(true)

    async function sendRequest(receiverId: string, senderId: string, page:number){
        reset()


        const sendRequest = await axios.post('api/sendFriendRequest', {senderId, receiverId}).then(res => res.data.response).catch(async res => {
            await user.getUsers(page)
            loading.value = false
            return res.response?.data?.errors ? errors.value.push(...res.response.data.errors) : errors.value.push('servidor offline')
        })
        if(sendRequest.errors?.length > 0) {
            loading.value = false
            return errors.value = sendRequest.errors
        }

        const user = useUserStore()
        await user.getUsers(page)
        loading.value = false
        friendRequestId.value = sendRequest
    }

    async function getRequests(receiverId: string){
        reset()
        friendRequests.value = []
        const requests = await axios.get('api/getFriendRequests'+`?receiverId=${receiverId}`).then(res => res.data.response).catch(async res => {
            loading.value = false
            return res.response?.data?.errors ? errors.value.push(...res.response.data.errors) : errors.value.push('servidor offline')
        })
        if(requests.errors?.length > 0) {
            loading.value = false
            return errors.value = requests.errors
        }
        
        loading.value = false
        friendRequests.value = requests
    }

    async function friendRequestResponse(receiverId: string, senderId: string, isAccept: boolean, friendRequestId: any){
        reset()
        const response = await axios.put('api/friendRequestResponse', {receiverId, senderId, isAccept, friendRequestId}).then(res => res.data.response).catch(async res => {
            loading.value = false
            return res.response?.data?.errors ? errors.value.push(...res.response.data.errors) : errors.value.push('servidor offline')
        })
        if(response.errors?.length > 0) {
            loading.value = false
            return errors.value = response.errors
        }

        
        loading.value = false
        await getRequests(receiverId)
    }

    function reset(){
        loading.value = true
        errors.value = []
    }
    return {requestResponse,sendRequest, loading, errors, getRequests, friendRequests, friendRequestResponse}
})