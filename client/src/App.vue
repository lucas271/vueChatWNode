<template>
  <v-app :theme="isDarkMode ? 'dark': 'light'">
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
  import {useIsDarkModeStore} from '@/store/isDarkModeStore'
  import { storeToRefs } from 'pinia';

  const {isDarkMode} = storeToRefs(useIsDarkModeStore())
  import socket from '@/socket'
  import { useUserStore } from './store/userStore';
import { useFriendRequestStore } from './store/friendRequestStore';
  const userStore = useUserStore()
  const friendRequestStore = useFriendRequestStore()
  userStore.getUser()
  socket && function socketInit(){
    socket.connect()
    socket.on("friendRequest", async (data) => {
    if(data.receiverId === userStore.user?.id) await friendRequestStore.getRequests(data.receiverId)
    })
  }()

</script>
