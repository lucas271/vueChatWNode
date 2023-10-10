<template>
  <v-app-bar>
      <v-app-bar-title> Aplicativo de mensagens  </v-app-bar-title>
      <template #append>
        <v-switch :model-value="isDarkMode" @click="ChangeMode" :hide-details="true"/>
        <v-menu>
          <template #activator="{props}">
            <v-avatar icon="mdi-face-man-profile" v-bind="props">
              <v-icon icon="$vuetify">
              </v-icon>
            </v-avatar> 
          </template>
          <v-card min-width="200px">
              <v-list :lines="false" density="compact" nav class="pa-0">
                <v-list-item :prepend-icon="user ? 'mdi-exit-to-app': 'mdi-location-exit'" :to="user ? '/' : '/auth'" class="pa-3" @click="() => user && logoutUser()">{{ user ? 'SAIR' : 'ENTRAR' }}</v-list-item>
              </v-list>
          </v-card>
        </v-menu>

        <v-menu v-if="user">
          <template #activator="{props}">
            <v-badge  :content="friendRequests.length" :model-value="friendRequests.length > 0">
              <v-icon v-bind="props" icon="mdi-bell-outline" >
              </v-icon>
            </v-badge>
          </template>
          <v-card v-if="friendRequests.length > 0">
            <v-list class="w-auto" max-height="40vh">
              <v-list-item v-for="item in friendRequests" v-bind:key="item.id" class="pa-3">
                <div class="d-flex">
                  <v-avatar :icon="item.profilePic || 'mdi-face-man-profile'"></v-avatar>
                  <div>
                    <v-list-item-title>{{item.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{item.email}}</v-list-item-subtitle>
                  </div>
                </div>


                <div class="d-flex my-4">
                  <v-btn class="mr-2" @click="() => friendRequestResponse(user?.id || '' , item.id || '', true, item.friendRequestSent[0].id)">Aceitar</v-btn>
                  <v-btn @click="() => friendRequestResponse(user?.id || '' ,item.id || '', false, item.friendRequestSent[0].id)">Rejeitar</v-btn>
                </div>

                <v-divider thickness="2"></v-divider>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
  import { useIsDarkModeStore } from '@/store/isDarkModeStore';
  import { useUserStore } from '@/store/userStore';
  import { storeToRefs } from 'pinia';
  import { useFriendRequestStore } from '@/store/friendRequestStore';


  const {isDarkMode} = storeToRefs(useIsDarkModeStore())
  const {user} = storeToRefs(useUserStore())
  const {logoutUser} = useUserStore()
  const {ChangeMode} =  useIsDarkModeStore()
  const {friendRequests} = storeToRefs(useFriendRequestStore())
  const {friendRequestResponse} = useFriendRequestStore()
</script>

<style  scoped>
</style>