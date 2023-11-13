<template>
    <v-col cols="auto" class="flex-grow-1 flex-shrink-1 h-100 pa-3 d-flex flex-column space-between">
        <v-card class=" h-75 flex-grow-1 flex-shrink-1 d-flex flex-column overflow-auto elevation-0 pa-3" v-if="user && selectedChat">
            <div class="d-flex align-center mb-4">
                <v-avatar>
                    <v-img cover :src="selectedChat.friendProfilePic ? selectedChat.friendProfilePic :  'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'"/> 
                </v-avatar>
                <v-card-title class="text-uppercase">{{ selectedChat.friendName }}</v-card-title>
            </div>
            <div class="overflow-auto scrollbar" v-if="loading === false">
                <v-hover v-for="(message) in messages" :key="message.id">
                    <template v-slot:default="{isHovering, props: hover}" >
                        <div  class="d-flex w-100 my-4">

                            <v-menu class="h-100">
                                <template #activator="{isActive, props}">
                                    <v-chip  dark v-bind="props" :class="`h-auto overflow-hidden rounded-xl w-auto px-3 py-0 responsive-message ${message.senderId === user.id ? 'ml-auto bg-blue' : 'mr-auto'}`"  prepend-icon="mdi-chevron-down" >
                                        <div v-bind="hover">
                                            <v-list  class="bg-transparent d-flex w-100 pa-0 ma-0">
                                                <v-list-item class="flex-shrink-1 text-wrap">
                                                    {{ message.message }}
                                                </v-list-item>
                                                <v-list-item style="width: fit-content; max-width: 30%;" class="mx-1 pa-1 text-wrap">
                                                    <sub >
                                                        {{ getMessageSentTime(message.createdAt) }}
                                                    </sub>
                                                    <v-icon v-if='isHovering || isActive' size="small" icon="mdi-chevron-down">
                                                    </v-icon>
                                                </v-list-item>
                                            </v-list>
                                        </div>
                                    </v-chip>
                                </template>
                                <v-card class="w-auto ml-auto">
                                    <v-list>
                                        <v-list-item>remover</v-list-item>
                                    </v-list>
                                </v-card>
                            </v-menu>
                        </div>
                    </template>
                </v-hover>
                <v-card-text v-if="isFriendTyping">Amigo escrevendo algo...</v-card-text>
            </div>
            <v-progress-circular indeterminate width="12" size="100" v-else></v-progress-circular>            

        </v-card>
        <v-card class="h-100 d-flex justify-center align-center" v-else>
            <v-card-title class="">Nenhum chat selecionado</v-card-title>
        </v-card>

        <div class="d-flex justify-center align-end ma-0 pa-0 mt-3 mt-sm-6">
            <v-text-field
            v-model="inputMessage"
            v-model:focused="inputRef"
            label="Enviar Mensagem"
            type="text"
            no-details
            outlined
            append-outer-icon="send"
            @keyup.enter="inputMessage"
            hide-details
            :disabled="selectedChat?.id ? false: true"
            class="align-center"
            />
            <v-btn class="ml-2 rounded-lg  rounded-circle pa-0 h-100" :disabled="selectedChat?.id ? false: true" @click="sendMessage(inputMessage); inputMessage = ''" v-model="inputMessage"><v-icon icon="mdi-send"></v-icon></v-btn>
        </div>
        
    </v-col>
</template>

<script setup lang="ts">
import socket from '@/socket';
import { useChatStore } from '@/store/chatStore';
import { useMessageStore } from '@/store/messagesStore';
import { useUserStore } from '@/store/userStore';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';
import { ref } from 'vue';


const inputMessage = ref<string>('')
const inputRef = ref<boolean>(false)
const isFriendTyping = ref<boolean>(false)



const {selectedChat, loading} = storeToRefs(useChatStore())
const {messages} = storeToRefs(useMessageStore())
const {user} = storeToRefs(useUserStore())
const {sendMessage} = useMessageStore()

watch(inputRef, () => {
    if(inputRef.value && socket) {
        return socket.emit('userTyping', {userId: user.value?.id, friendId: selectedChat.value?.friendId, chatId: selectedChat.value?.id})
    }
    socket && socket.off('userTyping')
})

onMounted(() => {
    socket && socket.on('isFriendTyping', (value) => {
        console.log(value.chatId, value.friendId === user.value?.id)
        if(value.friendId === user.value?.id && value.chatId === selectedChat.value?.id) console.log('happy :)')
    })
})

const getMessageSentTime = (messageTime: Date) => {
    let messagePostedTime = new Date(messageTime)
    const currentTime = new Date()
    //probably could use a switch case here think about it later
    //the reason I decided to get dates separeted by the ifs is for performance.

    const timeDiffInYears: number = (currentTime.getTime() - messagePostedTime.getTime()) / 1000 / 60 / 60 / 24 / 365

    if(timeDiffInYears >= 1) return `Há ${Math.floor(timeDiffInYears)} ${Math.floor(timeDiffInYears) > 1 ? 'anos': 'ano'} atrás`

    const timeDiffInMonths: number = (currentTime.getTime() - messagePostedTime.getTime()) / 1000 / 60 / 60 / 24 / 30

    if(timeDiffInMonths >= 1) return `Há ${Math.floor(timeDiffInMonths)} ${Math.floor(timeDiffInMonths) > 1 ? 'meses': 'mês'} atrás`

    const timeDiffInDays: number = (currentTime.getTime() - messagePostedTime.getTime()) / 1000 / 60 / 60 / 24

    if(timeDiffInDays >= 1) return `Há ${Math.floor(timeDiffInDays)} ${Math.floor(timeDiffInDays) > 1 ? 'dias': 'dia'} atrás`

    const timeDiffInHours: number = (currentTime.getTime() - messagePostedTime.getTime()) / 1000 / 60 / 60 

    if(timeDiffInHours >= 1) return `Há ${Math.floor(timeDiffInHours)} ${Math.floor(timeDiffInHours) > 1 ? 'horas': 'hora'} atrás`

    const timeDiffInMinutes: number = (currentTime.getTime() - messagePostedTime.getTime()) / 1000 / 60

    if(timeDiffInMinutes >= 1) return `Há ${Math.floor(timeDiffInMinutes)} ${Math.floor(timeDiffInMinutes) > 1 ? 'minutos': 'minuto'} atrás`
    
    const timeDiffInSecs: number = (currentTime.getTime() - messagePostedTime.getTime()) / 1000
    
    return `Há ${Math.floor(timeDiffInSecs)} ${Math.floor(timeDiffInSecs) > 1 ? 'segundos': 'segundo'} atrás`
}
</script>

<style scoped>

.responsive-message{
    max-width: 75%;
    @media (max-width: 400px){
        max-width: 95%;
    }
}
.scrollbar::-webkit-scrollbar {
  width: 12px;
}

/* Track */
.scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px gray;
}

/* Handle */
.scrollbar::-webkit-scrollbar-thumb {
  background: gray;
}

/* Handle on hover */
.scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>