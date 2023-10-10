<template>
  <v-app>
    <NavbarComponent/>
    <v-main class="d-flex align-center">
      <v-container class="h-75 bg-blue-grey-lighten-5 rounded-lg">
        <v-row class="h-100 d-none d-sm-flex flex-nowrap">
          <FriendListComponent/>
          <ChatComponent/>
        </v-row>
        <v-window class="h-100 d-sm-none">
          <v-window-item :value="2" class="h-100">
            <FriendListComponent/>
          </v-window-item>
          <v-window-item :value="1" class="h-100">
            <ChatComponent/>
          </v-window-item>
        </v-window>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
import FriendListComponent from '@/components/home/FriendListComponent.vue';
import ChatComponent from '@/components/home/chatComponent.vue';
</script>

<style  scoped>
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