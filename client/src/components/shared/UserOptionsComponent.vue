<template>
    <v-menu class="">
        <template #activator="{props}" >
        <v-avatar icon="mdi-face-man-profile" v-bind="props" style="cursor: pointer;" class="mx-1">
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
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/userStore';
import { storeToRefs } from 'pinia';


const {user} = storeToRefs(useUserStore())
const {logoutUser} = useUserStore()
</script>