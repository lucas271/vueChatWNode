import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"

interface Friend{
    id: string,
    email: string,
    profilePic: string,
    name: string
}

export const useFriendShipStore =  defineStore('friendShip', () => {
    // use refs
    const errors = ref<string[]>([])
    const loading = ref<boolean>(true)
    const friendsList = ref<Friend[]>()

    async function getFriends(userId: string){
        if(!userId) return
        reset()
        const friends = await axios.get('api/getFriendships'+`?userId=${userId}`).then(res => res.data.response).catch(async res => {
            loading.value = false
            return res.response?.data?.errors ? errors.value.push(...res.response.data.errors) : errors.value.push('servidor offline')
        })
        if(errors.value.length > 0) return loading.value = false

        friendsList.value = friends
        loading.value = false
    }


    function reset(){
        loading.value = true
        errors.value = []
    }
    return {errors, loading, getFriends, friendsList}
})