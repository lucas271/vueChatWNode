<template>
  <v-app :theme="isDarkMode ? 'dark': 'light'">
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
  import {useIsDarkModeStore} from '@/store/isDarkModeStore'
  import { storeToRefs } from 'pinia';

  const {isDarkMode} = storeToRefs(useIsDarkModeStore())
</script>
