<template>
    <div class="d-flex justify-center align-end ma-0 pa-0 mt-3 mt-sm-6">
        <v-text-field
        v-model="inputMessage"
        v-model:focused="isFocused"
        label="Enviar Mensagem"
        type="text"
        no-details
        outlined
        append-outer-icon="send"
        @keyup.enter="sendMessage(inputMessage); inputMessage = '';"
        hide-details
        :disabled="selectedChat ? false : true"
        class="align-center"
        />
        <v-btn class="ml-2 rounded-lg  rounded-circle pa-0 h-100" :disabled="selectedChat?.id ? false: true" @click="sendMessage(inputMessage); inputMessage = '';" v-model="inputMessage"><v-icon icon="mdi-send"></v-icon></v-btn>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMessageStore } from '@/store/messagesStore';
import {chatInterface} from '@/store/chatStore'
import { watch } from 'vue';
import socket from '@/socket';
import { UserInterface } from '@/store/userStore';
import { emit } from 'process';

const isFocused = ref<boolean>(false)
const inputMessage = ref<string>('')
const {sendMessage} = useMessageStore()

const props = defineProps<{selectedChat: chatInterface | null | undefined, user: UserInterface | null | undefined}>()

const emits = defineEmits(["stoped-typing"])

watch(isFocused, () => {
    if(isFocused.value && socket) {
        return socket.emit('userTyping', {userId: props.user?.id, friendId: props.selectedChat?.friendId, chatId: props.selectedChat?.id})
    }
    socket && socket.off('userTyping', () => {}) && socket.emit('stopedTyping', {friendId: props.selectedChat?.friendId})
})


</script>