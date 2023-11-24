<template>
  <v-app-bar>
        <v-app-bar-title > 
          <v-hover v-slot="{isHovering, props}">
            <router-link to="/" :class="`text-decoration-none ${isHovering ? 'text-grey' : 'text-secondary'} mr-2 text-sm-h5 text-subtitle-1 font-weight-bold`" v-bind="props"> App De Mensagens </router-link>
          </v-hover>
        </v-app-bar-title>
      <template #append>
        <NotificationsComponent/>
        <UserOptionsComponent/>
        <v-switch :model-value="isDarkMode" @click="ChangeMode" :hide-details="true"/>
      </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
  import { useIsDarkModeStore } from '@/store/isDarkModeStore';
  import { storeToRefs } from 'pinia';
  import NotificationsComponent from './shared/NotificationsComponent.vue';
  import UserOptionsComponent from './shared/UserOptionsComponent.vue'
import socket from '@/socket';
import { onMounted } from 'vue';
import { useUserStore } from '@/store/userStore';
import { useFriendRequestStore } from '@/store/friendRequestStore';

  const {isDarkMode} = storeToRefs(useIsDarkModeStore())
  const {ChangeMode} =  useIsDarkModeStore()

  onMounted(() => {
    const userStore = useUserStore()
    const friendRequestStore = useFriendRequestStore()

    socket.on("friendRequest", async (data) => {
    if(data.receiverId === userStore.user?.id) await friendRequestStore.getRequests(data.receiverId)
    })
  })


</script>

<style  scoped>
</style>