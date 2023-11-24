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
  import { onMounted } from 'vue';
  const userStore = useUserStore()

  userStore.getUser()

  onMounted(() => socket && socket.connect())

</script>
