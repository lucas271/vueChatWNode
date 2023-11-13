<template>
  <v-app>
    <NavbarComponent/>
    <v-main class="d-flex align-center" style="max-height: 100vh;">
      <v-container class="bg-blue-grey-lighten-5 rounded-lg extra-reponsive-container" v-if="user?.id">
        <v-row class="h-100 d-none d-sm-flex flex-nowrap">
          <FriendListComponent/>
          <ChatComponent/>
        </v-row>
        <v-window class="h-100 d-sm-none" v-model="step">
          <v-window-item :value="1" class="h-100">
            <FriendListComponent/>
          </v-window-item>
          <v-window-item :value="2" class="h-100">
            <v-btn  rounded="lg" variant="plain" @click="exitChat"> <v-icon icon="mdi-arrow-left"></v-icon></v-btn>
            <ChatComponent/>
          </v-window-item>
        </v-window>
      </v-container>
      <v-container v-else class="responsive-height">
        <v-card class="h-100 pa-5 bg-grey d-flex  justify-center align-center">
          <div class="responsive-width">
            <h1 class="text-sm-h2 text-lg-h1 text-h3 font-weight-bold"> Você precisa Ter uma conta Para acessar o chat</h1>
            <h3 class="mt-sm-5 mt-3 text-sm-h4 text-h6 text-subtitle text-blue-grey-lighten-5"> Escolha uma opção abaixo para ser capaz de acessar o chat.</h3>
            <div class="d-sm-flex mt-sm-5 mt-3  d-flex-column">
              <v-btn class="pa-8 text-sm-h5 pa-sm-10 text-h6 d-flex align-center justify-center" to="/auth?register=true"> Criar conta </v-btn>
              <v-btn class="pa-8 pa-sm-10 text-sm-h5 text-h6 ml-sm-5 mt-sm-0 mt-3 d-flex align-center justify-center" to="/auth"> Entrar </v-btn>
            </div>
          </div>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
import FriendListComponent from '@/components/home/FriendListComponent.vue';
import { useUserStore } from '@/store/userStore';
import {useChatStore} from '@/store/chatStore'
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';


const {user} = storeToRefs(useUserStore())
const {selectedChat} = storeToRefs(useChatStore())
const step = ref<1 | 2>(selectedChat.value ? 2 : 1)

const exitChat = () => {
  step.value = 1
  useChatStore().reset()
}

watch(selectedChat, () => {
  step.value = selectedChat.value ? 2 : 1
})
</script>

<style  scoped>

.extra-reponsive-container{
  height: 75%;
  @media (max-width: 400px) {
    height: 90%;
    padding: 3px;
    padding-top: 10px;
  }
}
.responsive-height {
  height: 80%;

  @media (max-width: 600px) {
    height: 95%;
  }
}

.responsive-width {
  width: 75%;

  @media (max-width: 600px) {
    width: 90%;
  }
}
.scrollbar::-webkit-scrollbar {
width: 5px;
}

/* Track */
.scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 3px gray;
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