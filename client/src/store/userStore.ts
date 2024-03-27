import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"
import router from "@/router"
import socket from "@/socket"

export interface UserInterface {
    email: string,
    name: string,
    profilePic: string,
    id: string,
    updatedAt: string,
    createdAt: string
}

interface AuthResponse{
    user?: UserInterface
    errors?: string[]
}

export const useUserStore =  defineStore('user', () => {
    const user = ref<UserInterface>()
    const users = ref<UserInterface[]>([])
    const isLogged = ref<boolean>(false)
    const errors = ref<string[]>([])
    const limit = ref<number>(5)
    const totalUsers = ref<number>(0)
    const loading = ref<boolean>(true)

    async function login(email: string, password: string): Promise<AuthResponse>{
        reset()
        const user = await axios.post('https://vuechatwnodeapi-jt77.onrender.com/loginUser', {email, password}).then(res => res.data.response).catch(res => {
            loading.value = false
            res.response?.data?.errors ? errors.value.push(...res.response.data.errors) : errors.value.push('servidor offline')
            return errors.value
        })

        if(errors.value.length > 0) {
            loading.value = false
            return  {errors: errors.value}
        }

        errors.value = []
        user.value = {...user}

        localStorage.setItem('user', JSON.stringify(user))

        loading.value = false
        return {user: user.value}
    }

    async function register(email: string, password: string, name: string): Promise<AuthResponse>{
        reset()
        const user = await axios.post('https://vuechatwnodeapi-jt77.onrender.com/createUser', {email, password,  name}).then(res => res.data.response).catch(res => {
            loading.value = false
            res.response?.data?.errors ? errors.value.push(...res.response.data.errors) : errors.value.push('servidor offline')
            return errors.value
        })

        if(errors.value.length > 0) {
           loading.value = false 
           return  {errors: errors.value}
        }

        errors.value = []
        user.value = {...user}

        localStorage.setItem('user', JSON.stringify(user))
        loading.value = false
        return {user: user.value}
    }
    function getUser(){
        reset()
        const localStorageUser: UserInterface = JSON.parse(String(localStorage.getItem('user')))
        isLogged.value = localStorageUser ? true : false
        if(isLogged.value == false) return loading.value = false
        socket && socket.emit("userCredentials", localStorageUser.id)
        user.value = localStorageUser
        loading.value = false
    }

    async function getUsers(skip: number){ 
        reset()
        skip = skip * limit.value

        const getUsers = await axios.get('https://vuechatwnodeapi-jt77.onrender.com/getUsers'+`?limit=${limit.value}&skip=${skip}&user=${user.value?.id}`).then(res => {
        if (res.data?.error) return errors.value.push(res.data.error) 
        return res.data.response }).catch(res => {
            loading.value = false
            res.response?.data?.errors ? errors.value.push(...res.response.data.errors) : errors.value.push('servidor offline')
            return errors.value
        })

        if(errors.value.length > 0) return loading.value = false
        if(getUsers.usersCount < 1) {
            loading.value = false
            users.value = []
            return errors.value.push('Nenhum usuário encontrado...')
        }

        users.value = getUsers.usersSelected
        totalUsers.value = getUsers.usersCount

        loading.value = false
    }


    function logoutUser(){
        reset()
        localStorage.removeItem('user')

        isLogged.value = false
        loading.value = false
        return router.go(0)
    }

    function reset(){
        loading.value = true
        errors.value = []
    }

    return {loading, totalUsers, limit, login, register, reset, getUser, getUsers, logoutUser, user, errors, isLogged, users}
})
