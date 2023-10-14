import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"
import router from "@/router"

interface UserInterface {
    email: string,
    name: string,
    profilePic: string,
    id: string,
    updatedAt: string,
    createdAt: string
}

export const useUserStore =  defineStore('user', () => {
    const user = ref<UserInterface>()
    const users = ref<UserInterface[]>([])
    const isLogged = ref<boolean>(false)
    const errors = ref<string[]>([])
    const limit = ref<number>(5)
    const totalUsers = ref<number>(0)
    const loading = ref<boolean>(true)

    async function login(email: string, password: string){
        reset()
        const user = await axios.post('http://localhost:3001/loginUser', {email, password}).then(res => res.data.response).catch(res => {
            loading.value = false
            return errors.value.push(res.errors || "servidor offline")
        })

        //to be honest idk if this is necessary, my ideia for keeping this is preventing wrong statusCode coming through the server from breaking the client.
        if(user.errors) {
            loading.value = false
            return errors.value = user.errors
        }

        errors.value = []
        user.value = {...user}

        localStorage.setItem('user', JSON.stringify(user))

        loading.value = false
    }

    async function register(email: string, password: string, name: string){
        reset()
        const user = await axios.post('http://localhost:3001/createUser', {email, password,  name}).then(res => res.data.response).catch(res => {
            loading.value = false
            return errors.value.push(res.errors || "servidor offline")
        })

        if(errors.value.length > 1) {
           loading.value = false 
           return  errors.value = user.errors
        }

        errors.value = []
        user.value = {...user}

        localStorage.setItem('user', JSON.stringify(user))

        loading.value = false
    }
    function getUser(){
        reset()
        isLogged.value = localStorage.getItem('user') ? true : false
        if(isLogged.value == false) return loading.value = false
        user.value = JSON.parse(String(localStorage.getItem('user')))

        loading.value = false
    }

    async function getUsers(skip: number){ 
        reset()

        skip = skip * limit.value

        const getUsers = await axios.get('http://localhost:3001/getUsers'+`?limit=${limit.value}&skip=${skip}&user=${user.value?.id}`).then(res => res.data.response).catch(res => {
            loading.value = false
            return errors.value.push(res.errors || "servidor offline")
        })


        if(errors.value.length > 0) return loading.value = false

        if(getUsers.usersCount < 1) {
            loading.value = false
            users.value = []
            return errors.value.push('Nenhum usuário encontrado...')
        }

        console.log(getUsers.usersSelected)
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