<template>
    <v-col cols="auto" class="flex-grow-1 flex-shrink-1 pa-3 d-flex flex-column space-between responsive-height">
        <v-card class=" h-75 flex-grow-1 flex-shrink-1 d-flex flex-column overflow-auto elevation-0 pa-3" v-if="user && selectedChat">
            <div class="d-flex align-center mb-4">
                <v-avatar>
                    <v-img cover :src="selectedChat.friendProfilePic ? selectedChat.friendProfilePic :  'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'"/> 
                </v-avatar>
                <v-card-title class="text-uppercase">{{ selectedChat.friendName }}</v-card-title>
            </div>
            <div class="overflow-auto scrollbar pa-4" v-if="loading === false" ref="chatContainerRef">
                <div v-for="(message) in messages" :key="message.id">
                    <MessageComponent :message="message" :user="user"/>
                </div>
                <IsTypingComponent :text="`${selectedChat.friendName} está digitando...`" :isTyping="isFriendTyping"/>
            </div>
            <v-progress-circular indeterminate width="12" size="100" v-else></v-progress-circular>            

        </v-card>

        <v-card class="h-100 d-flex justify-center align-center" v-else>
            <v-card-title class="">Nenhum chat selecionado</v-card-title>
        </v-card>
        <SendMessage :selectedChat="selectedChat" :user="user"/>
    </v-col>
</template>

<script setup lang="ts">
import socket from "@/socket"
import { useChatStore } from '@/store/chatStore';
import { useMessageStore } from '@/store/messagesStore';
import { useUserStore } from '@/store/userStore';
import { storeToRefs } from 'pinia';
import { watch, onMounted, ref } from 'vue';
import MessageComponent from '@/components/home/MessageComponent.vue'
import scrollToBottom from '@/util/scrollToBottom'
import IsTypingComponent from '@/components/shared/IsTypingComponent.vue';
import SendMessage from "../shared/SendMessage.vue";


const isFriendTyping = ref<boolean>(false)
const {selectedChat, loading} = storeToRefs(useChatStore())
const {messages} = storeToRefs(useMessageStore())
const {user} = storeToRefs(useUserStore())

const chatContainerRef = ref<HTMLElement | null>()

//scrollTobottom when chatContainer is initialized/changed
watch(chatContainerRef, (value) => {
    if(!chatContainerRef.value) return
    value && scrollToBottom(value)

}, {deep: true})

//scrollTobottom when new message is added or friend is typing
watch([() => messages.value, isFriendTyping], () => { 
  console.log('a')
    chatContainerRef.value && scrollToBottom(chatContainerRef.value)

    
}, {deep: true})

onMounted(() => {
    socket && socket.on('isFriendTyping', (value) => {
        if(value.friendId === user.value?.id && value.chatId === selectedChat.value?.id) isFriendTyping.value = true
    })

    socket.on('stopedTyping', (value) =>  isFriendTyping.value = user.value?.id === value.id ? false : true)
})
</script>

<style scoped>


.responsive-height {
  height: 100% !important;

  @media (max-width: 600px) {
    height: 95% !important;
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